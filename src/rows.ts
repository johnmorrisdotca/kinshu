import type { Currency, CurrencyRow } from "./types";

export type { CurrencyRow };

export function expandCurrency(row: CurrencyRow): Currency {
  const [code, en, ja, symbol, exponent, cashStep, tender] = row;
  return { code, name: { en, ja }, symbol, exponent, cashStep, tender };
}
