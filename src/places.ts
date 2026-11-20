import { currencies, currency } from "./currency";
import type { AcceptedPlace } from "./types";

// Hand-checked places where a currency is commonly taken and is not legal tender.
// Each row needs a page that states it. An empty list is the honest state until then.
const ACCEPTED: Readonly<Record<string, readonly AcceptedPlace[]>> = {};

const BY_COUNTRY = new Map<string, string[]>();
let indexed = false;

function indexCountries(): void {
  if (indexed) return;
  indexed = true;
  for (const item of currencies()) {
    for (const place of item.tender) {
      const found = BY_COUNTRY.get(place);
      if (found) found.push(item.code);
      else BY_COUNTRY.set(place, [item.code]);
    }
  }
  for (const codes of BY_COUNTRY.values()) codes.sort();
}

/** Alpha-2 codes where this currency is legal tender now. */
export function tender(code: string): readonly string[] {
  return currency(code)?.tender ?? [];
}

/** Currency codes that are legal tender in this country now, in code order. */
export function currenciesOf(country: string): readonly string[] {
  indexCountries();
  return BY_COUNTRY.get(country.toUpperCase()) ?? [];
}

/** Places that commonly take it without making it legal tender. */
export function accepted(code: string): readonly AcceptedPlace[] {
  return ACCEPTED[code.toUpperCase()] ?? [];
}
