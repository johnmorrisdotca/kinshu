import { describe, expect, it } from "vitest";
import { cashBreakdown, quote } from "./index";
import { parts } from "./parts";
import { bitcoinLaw } from "./bitcoin";
import { currencies, currency } from "./currency";
import { currenciesOf, tender } from "./places";

describe("currencies", () => {
  it("covers every tender currency Kuni records, not only the first eight", () => {
    expect(currencies().length).toBeGreaterThan(100);
    expect(currency("JPY")?.name.en).toBe("Japanese Yen");
    expect(currency("JPY")?.exponent).toBe(0);
    expect(currency("BHD")?.exponent).toBe(3);
    expect(currency("nope")).toBeNull();
  });

  it("puts the yen in Japan only and the dollar in many places", () => {
    expect(tender("JPY")).toEqual(["JP"]);
    expect(tender("USD")).toContain("US");
    expect(tender("USD")).toContain("EC");
    expect(tender("USD").length).toBeGreaterThan(10);
    expect(tender("EUR").length).toBeGreaterThan(20);
    expect(tender("USD")).not.toContain("KH");
  });

  it("reads a place back to the currencies that are legal tender there", () => {
    expect(currenciesOf("JP")).toEqual(["JPY"]);
    expect(currenciesOf("EC")).toEqual(["USD"]);
    expect(currenciesOf("PA")).toEqual(["PAB", "USD"]);
    expect(currenciesOf("HT")).toEqual(["HTG", "USD"]);
    expect(currenciesOf("ZW")).toEqual(["USD", "ZWG"]);
    expect(currenciesOf("AQ")).toEqual([]);
    expect(currenciesOf("nope")).toEqual([]);
  });
});

describe("cash", () => {
  it("rounds 185.07 Canadian dollars to a nickel and names the notes", () => {
    const result = cashBreakdown(185.07, "CAD");
    expect(result?.exactMinor).toBe(18507);
    expect(result?.cashMinor).toBe(18505);
    expect(result?.parts).toEqual({ sign: "$", whole: "185", fraction: "07" });
    expect(result?.pieces.map((piece) => [piece.kind, piece.minor, piece.count])).toEqual([
      ["note", 10000, 1],
      ["note", 5000, 1],
      ["note", 2000, 1],
      ["note", 1000, 1],
      ["note", 500, 1],
      ["coin", 5, 1],
    ]);
  });

  it("gives yen no fraction and a 10000 note", () => {
    expect(parts(10000, { symbol: "¥", exponent: 0 })).toEqual({ sign: "¥", whole: "10000", fraction: null });
    const result = cashBreakdown(18500, "JPY");
    expect(result?.pieces.map((piece) => piece.minor)).toEqual([10000, 5000, 1000, 500]);
  });

  it("has no pieces yet for a currency past the first eight", () => {
    expect(quote("BHD")?.cash).toBeNull();
    expect(cashBreakdown(1, "BHD")).toBeNull();
    expect(quote("CHF")?.tender).toEqual(["CH", "LI"]);
  });
});

describe("bitcoin", () => {
  it("records El Salvador from the 2025 decree and does not invent the rest", () => {
    expect(bitcoinLaw("SV")?.status).toBe("permitted");
    expect(bitcoinLaw("CN")).toBeNull();
    expect(bitcoinLaw("SV")?.source).toMatch(/^https:\/\/www\.jurisprudencia\.gob\.sv\//);
  });
});
