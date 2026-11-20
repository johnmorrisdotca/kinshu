import { describe, expect, it } from "vitest";
import { former, noteCensus, redenominations, series, tenures, withdrawn } from "./history";

describe("tenures", () => {
  it("keeps the franc and the euro overlapping in France", () => {
    const rows = tenures("FR");
    expect(rows.find((row) => row.code === "EUR")).toMatchObject({ from: "1999-01-01", to: null, tender: true });
    expect(rows.find((row) => row.code === "FRF")).toMatchObject({ from: "1960-01-01", to: "2002-02-17", tender: true });
    expect(former("FR").map((row) => row.code)).toContain("FRF");
    expect(former("FR").map((row) => row.code)).not.toContain("EUR");
  });

  it("keeps the Romanian leu and does not turn it into the euro", () => {
    expect(tenures("RO").map((row) => row.code)).toEqual(["ROL", "RON"]);
    expect(tenures("RO").find((row) => row.code === "RON")?.to).toBeNull();
    expect(redenominations("RO")).toMatchObject([{ from: "ROL", to: "RON", ratio: "10000", on: "2005-07-01" }]);
    expect(redenominations("RO").some((row) => row.to === "EUR")).toBe(false);
    expect(redenominations("RO")[0]?.note).toMatch(/did not become the euro/);
  });

  it("records every euro rate fixed after the original eleven", () => {
    expect(redenominations("GR")).toMatchObject([{ from: "GRD", to: "EUR", ratio: "340.750", on: "2001-01-01" }]);
    expect(redenominations("SI")).toMatchObject([{ from: "SIT", to: "EUR", ratio: "239.640", on: "2007-01-01" }]);
    expect(redenominations("CY")).toMatchObject([{ from: "CYP", to: "EUR", ratio: "0.585274", on: "2008-01-01" }]);
    expect(redenominations("MT")).toMatchObject([{ from: "MTL", to: "EUR", ratio: "0.429300", on: "2008-01-01" }]);
    expect(redenominations("SK")).toMatchObject([{ from: "SKK", to: "EUR", ratio: "30.1260", on: "2009-01-01" }]);
    expect(redenominations("EE")).toMatchObject([{ from: "EEK", to: "EUR", ratio: "15.6466", on: "2011-01-01" }]);
    expect(redenominations("LV")).toMatchObject([{ from: "LVL", to: "EUR", ratio: "0.702804", on: "2014-01-01" }]);
    expect(redenominations("LT")).toMatchObject([{ from: "LTL", to: "EUR", ratio: "3.45280", on: "2015-01-01" }]);
    expect(redenominations("HR")).toMatchObject([{ from: "HRK", to: "EUR", ratio: "7.53450", on: "2023-01-01" }]);
    expect(redenominations("BG")).toMatchObject([{ from: "BGN", to: "EUR", ratio: "1.95583", on: "2026-01-01" }]);
    expect(redenominations("BG")[0]?.source).toBe("https://eur-lex.europa.eu/eli/reg/2025/1409/oj/eng");
    expect(redenominations("DE")[0]?.on).toBe("1999-01-01");
  });

  it("records the peso cut and the notes and coins that lost tender", () => {
    expect(redenominations("MX")).toMatchObject([{ from: "MXP", to: "MXN", ratio: "1000", on: "1993-01-01" }]);
    expect(redenominations("BR")).toMatchObject([{ from: "BRR", to: "BRL", ratio: "2750", on: "1994-07-01" }]);
    expect(former("MX").map((row) => row.code)).toEqual(["MXP"]);
    expect(tenures("MX").some((row) => row.code === "MXV" && !row.tender)).toBe(true);
    expect(series("MX").filter((row) => row.kind === "note").map((row) => row.name)).toEqual([
      "AA",
      "A",
      "B",
      "C",
      "D",
      "F",
      "G",
    ]);
    expect(series("MX").filter((row) => row.kind === "coin").map((row) => row.name)).toEqual([
      "AA",
      "A",
      "B",
      "C",
      "D",
    ]);
    expect(series("MX").find((row) => row.kind === "note" && row.name === "AA")).toMatchObject({ currency: "MXP" });
    expect(series("MX").find((row) => row.kind === "note" && row.name === "B")?.note).toMatch(/nuevos pesos/);
    expect(series("MX").find((row) => row.kind === "note" && row.name === "G")?.note).toMatch(/does not say they are withdrawn/);
    expect(series("JP")).toEqual([]);
    expect(withdrawn("MX")).toMatchObject([
      { kind: "note", on: "1996-01-01" },
      { kind: "coin", on: "1995-11-15" },
    ]);
  });

  it("uses the Bank of Japan's own count and does not treat a stopped issue as invalid", () => {
    expect(tenures("JP")).toEqual([{ country: "JP", code: "JPY", from: "1871-06-01", to: null, tender: true }]);
    const census = noteCensus("JP");
    expect(census).toMatchObject({ issued: 56, valid: 25, withdrawn: 31 });
    expect(census && census.valid + census.withdrawn).toBe(census?.issued);
    expect(census?.note).toMatch(/no longer issued/);
    expect(withdrawn("JP")).toEqual([]);
    expect(noteCensus("FR")).toBeNull();
  });
});
