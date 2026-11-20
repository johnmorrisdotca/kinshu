import { describe, expect, it } from "vitest";
import { cashRound, fromMinor, toMinor } from "./minor";

describe("minor", () => {
  it("turns dollars into cents and yen into yen", () => {
    expect(toMinor(1.85, 2)).toBe(185);
    expect(toMinor(19.99, 2)).toBe(1999);
    expect(toMinor(185, 0)).toBe(185);
    expect(fromMinor(185, 2)).toBe(1.85);
  });

  it("rounds Canadian cash to the nearest nickel", () => {
    expect(cashRound(1, 5)).toBe(0);
    expect(cashRound(2, 5)).toBe(0);
    expect(cashRound(3, 5)).toBe(5);
    expect(cashRound(7, 5)).toBe(5);
    expect(cashRound(8, 5)).toBe(10);
    expect(cashRound(18507, 5)).toBe(18505);
  });

  it("leaves a one-unit step alone", () => {
    expect(cashRound(18507, 1)).toBe(18507);
  });
});
