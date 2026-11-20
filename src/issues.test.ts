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
    expect(issuesAt("JPY", "1980")).toEqual([]);
    expect(issuesAt("JPY", "2026").some((issue) => issue.minor === 10000)).toBe(true);
    expect(issuesAt("BHD", "2026")).toEqual([]);
    expect(issues("EUR").length).toBeGreaterThan(0);
  });
});
