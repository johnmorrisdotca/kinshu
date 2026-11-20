import { describe, expect, it } from "vitest";
import { cashBreakdown } from "./index";
import { issues, issuesAt, issueStanding } from "./issues";

describe("issues at a year", () => {
  it("shows Canada's 1 and 2 dollar notes in 1980 and not the coins that replaced them", () => {
    const notes = issuesAt("CAD", "1980").filter((issue) => issue.kind === "note");
    expect(notes.map((issue) => issue.minor)).toEqual([100, 200, 500, 1000, 2000, 2500, 5000, 10000, 50000, 100000]);
    expect(issueStanding(notes.find((issue) => issue.minor === 100)!, "1980")).toBe("issued");
    expect(issueStanding(notes.find((issue) => issue.minor === 2500)!, "1980")).toBe("tender");
    expect(issueStanding(notes.find((issue) => issue.minor === 100000)!, "1980")).toBe("issued");
    const coins = issuesAt("CAD", "1980").filter((issue) => issue.kind === "coin").map((issue) => issue.name);
    expect(coins).toEqual(["1 cent coin"]);
    expect(issueStanding(issues("CAD").find((issue) => issue.name === "1 dollar coin")!, "1980")).toBe("before");
    expect(issueStanding(issues("CAD").find((issue) => issue.name === "2 dollar coin")!, "1980")).toBe("before");
  });

  it("keeps the 1 dollar note and the loonie together in 1988", () => {
    const names = issuesAt("CAD", "1988").map((issue) => issue.name);
    expect(names).toContain("1 dollar note");
    expect(names).toContain("1 dollar coin");
    expect(names).not.toContain("2 dollar coin");
  });

  it("drops the old notes from legal tender in 2026 and still describes them", () => {
    const live = issuesAt("CAD", "2026").map((issue) => issue.name);
    expect(live).not.toContain("1 dollar note");
    expect(live).not.toContain("2 dollar note");
    expect(live).toContain("5 dollar note");
    expect(live).toContain("1 dollar coin");
    expect(live).toContain("2 dollar coin");
    expect(live).not.toContain("1,000 dollar note");
    const old = issues("CAD").find((issue) => issue.name === "1 dollar note");
    expect(issueStanding(old!, "2026")).toBe("honoured");
    expect(old?.note).toMatch(/1989/);
    expect(issueStanding(issues("CAD").find((issue) => issue.name === "1 cent coin")!, "2026")).toBe("unknown");
  });

  it("does not put the old notes into today's change", () => {
    const pieces = cashBreakdown(10000, "CAD")?.pieces.map((piece) => piece.minor) ?? [];
    expect(pieces).not.toContain(100);
    expect(pieces).not.toContain(200);
  });

  it("uses the same year lookup for the US dollar", () => {
    const then = issuesAt("USD", "1960").filter((issue) => issue.kind === "note").map((issue) => issue.minor);
    expect(then).toEqual([500, 1000, 2000, 5000, 10000, 50000, 100000, 500000, 1000000]);
    const now = issuesAt("USD", "2026").map((issue) => issue.name);
    expect(now).toContain("1 dollar note");
    expect(now).toContain("2 dollar note");
    expect(now).toContain("500 dollar note");
    expect(issueStanding(issues("USD").find((issue) => issue.name === "500 dollar note")!, "1944")).toBe("issued");
    expect(issueStanding(issues("USD").find((issue) => issue.name === "500 dollar note")!, "1960")).toBe("tender");
    expect(issueStanding(issues("USD").find((issue) => issue.name === "500 dollar note")!, "2026")).toBe("tender");
    expect(cashBreakdown(10000, "USD")?.pieces.some((piece) => piece.minor === 200)).toBe(false);
  });

  it("does not invent a past year for a currency whose page gives no start", () => {
    expect(issuesAt("JPY", "1980").map((issue) => issue.name)).toEqual([
      "100 yen coin",
      "50 yen coin",
      "10 yen coin",
      "5 yen coin",
      "1 yen coin",
    ]);
    expect(issuesAt("JPY", "2026").filter((issue) => issue.minor === 10000).map((issue) => issue.name)).toEqual([
      "10,000 yen note (2024)",
      "10,000 yen note (2004)",
    ]);
    expect(issueStanding(issues("JPY").find((issue) => issue.name === "2,000 yen note")!, "1999")).toBe("before");
    expect(issuesAt("BHD", "2026")).toEqual([]);
    expect(issues("EUR").length).toBeGreaterThan(0);
  });

  it("uses the Bank of England's own issue and withdrawal dates", () => {
    const seriesF = issues("GBP").find((issue) => issue.name === "20 pound Series F note");
    expect(issueStanding(seriesF!, "2010")).toBe("issued");
    expect(issueStanding(seriesF!, "2026")).toBe("honoured");
    expect(issuesAt("GBP", "2026").filter((issue) => issue.kind === "note").map((issue) => issue.name)).toEqual([
      "5 pound note",
      "10 pound note",
      "20 pound note",
      "50 pound note",
    ]);
    expect(issuesAt("GBP", "1980").some((issue) => issue.name === "20 pound Series D pictorial note")).toBe(true);
    expect(issuesAt("GBP", "1980").some((issue) => issue.name === "5 pound note")).toBe(false);
  });

  it("uses the euro, renminbi, won and baht dates the issuers printed", () => {
    expect(issuesAt("EUR", "2001").filter((issue) => issue.kind === "note")).toEqual([]);
    expect(issuesAt("EUR", "2002").some((issue) => issue.name === "5 euro note, first series")).toBe(true);
    expect(issueStanding(issues("EUR").find((issue) => issue.name === "5 euro note, Europa series")!, "2012")).toBe("before");
    expect(issueStanding(issues("EUR").find((issue) => issue.name === "5 euro note, Europa series")!, "2013")).toBe("issued");
    expect(issueStanding(issues("EUR").find((issue) => issue.name === "500 euro note, first series")!, "2026")).toBe("tender");
    expect(issuesAt("EUR", "2026").some((issue) => issue.name === "100 euro note, Europa series")).toBe(true);

    expect(issuesAt("CNY", "2014").some((issue) => issue.minor === 10000)).toBe(false);
    expect(issuesAt("CNY", "2016").some((issue) => issue.name === "100 yuan note, 2015 edition")).toBe(true);
    expect(issuesAt("CNY", "2019").some((issue) => issue.name === "1 yuan note, 2019 edition")).toBe(true);
    expect(issuesAt("CNY", "2020").some((issue) => issue.name === "5 yuan note, 2020 edition")).toBe(true);

    const tenThousand = issues("KRW").find((issue) => issue.name === "10,000 won note, Ga (1st)");
    expect(issueStanding(tenThousand!, "1974")).toBe("issued");
    expect(issueStanding(tenThousand!, "2026")).toBe("tender");
    expect(issuesAt("KRW", "2008").some((issue) => issue.name === "50,000 won note, first")).toBe(false);
    expect(issuesAt("KRW", "2009").some((issue) => issue.name === "50,000 won note, first")).toBe(true);

    expect(issuesAt("THB", "2017").some((issue) => issue.name === "20 baht note, series 17 paper")).toBe(false);
    expect(issuesAt("THB", "2018").some((issue) => issue.name === "1,000 baht note, series 17")).toBe(true);
    expect(issuesAt("THB", "2026").some((issue) => issue.name === "50 baht note, series 17 polymer")).toBe(true);
  });
});
