import { TENURE_ROWS } from "./data/tenures.data";
import { NOTE_CENSUSES, REDENOMINATIONS, SERIES, WITHDRAWN } from "./historyFacts";
import type { CashSeries, NoteCensus, Redenomination, Tenure, WithdrawnCash } from "./types";

const BY_COUNTRY = new Map<string, Tenure[]>();
for (const [country, code, from, to, tender] of TENURE_ROWS) {
  const list = BY_COUNTRY.get(country) ?? [];
  list.push({ country, code, from, to, tender });
  BY_COUNTRY.set(country, list);
}

/** Every spell CLDR records for this country, oldest first. */
export function tenures(country: string): readonly Tenure[] {
  return BY_COUNTRY.get(country.toUpperCase()) ?? [];
}

/** Tender spells that have an end date. */
export function former(country: string): readonly Tenure[] {
  return tenures(country).filter((row) => row.tender && row.to !== null);
}

/** Cited replacements of one currency by another. An empty list means none has been checked. */
export function redenominations(country: string): readonly Redenomination[] {
  const code = country.toUpperCase();
  return REDENOMINATIONS.filter((row) => row.country === code);
}

/** Note and coin series an issuer's own catalogue names. An empty list means none has been checked. */
export function series(country: string): readonly CashSeries[] {
  const code = country.toUpperCase();
  return SERIES.filter((row) => row.country === code);
}

/** Notes or coins a central bank says are no longer legal tender. */
export function withdrawn(country: string): readonly WithdrawnCash[] {
  const code = country.toUpperCase();
  return WITHDRAWN.filter((row) => row.country === code);
}

/** The issuer's own count of note kinds, when a page states one. */
export function noteCensus(country: string): NoteCensus | null {
  return NOTE_CENSUSES.find((row) => row.country === country.toUpperCase()) ?? null;
}
