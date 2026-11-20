import { toMinor } from "./minor";
import type { MoneyParts } from "./types";

interface PartsCurrency {
  symbol: string;
  exponent: number;
}

/** Splits an amount into the sign, the whole digits, and the fraction. The fraction is absent at exponent 0. */
export function parts(amount: number, currency: PartsCurrency): MoneyParts {
  const minor = toMinor(amount, currency.exponent);
  const negative = minor < 0;
  const absolute = Math.abs(minor);
  const factor = 10 ** currency.exponent;
  const wholeNumber = currency.exponent === 0 ? absolute : Math.trunc(absolute / factor);
  const whole = `${negative ? "-" : ""}${String(wholeNumber)}`;
  if (currency.exponent === 0) return { sign: currency.symbol, whole, fraction: null };
  const fraction = String(absolute % factor).padStart(currency.exponent, "0");
  return { sign: currency.symbol, whole, fraction };
}
