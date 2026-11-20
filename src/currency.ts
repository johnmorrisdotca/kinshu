import { CURRENCY_ROWS } from "./data/currencies.data";
import { expandCurrency } from "./rows";
import type { Currency } from "./types";

const LIST: readonly Currency[] = CURRENCY_ROWS.map(expandCurrency);
const BY_CODE = new Map(LIST.map((item) => [item.code, item]));

/** Every currency a country uses now, in code order. */
export function currencies(): readonly Currency[] {
  return LIST;
}

/** One currency, or null when the code is not a current tender currency. */
export function currency(code: string): Currency | null {
  return BY_CODE.get(code.toUpperCase()) ?? null;
}

export function isCurrencyCode(code: string): boolean {
  return BY_CODE.has(code.toUpperCase());
}
