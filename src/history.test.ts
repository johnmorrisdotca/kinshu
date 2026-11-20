import { describe, expect, it } from "vitest";
import { former, noteCensus, redenominations, tenures, withdrawn } from "./history";

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

  it("records the peso cut and the notes and coins that lost tender", () => {
    expect(redenominations("MX")).toMatchObject([{ from: "MXP", to: "MXN", ratio: "1000", on: "1993-01-01" }]);
    expect(former("MX").map((row) => row.code)).toEqual(["MXP"]);
    expect(tenures("MX").some((row) => row.code === "MXV" && !row.tender)).toBe(true);
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
