import type { BitcoinLaw } from "./types";

// A country is listed only when a primary source says what the law is. The Atlantic Council
// studies 75 countries (updated September 2026) and does not publish a table we can vendor,
// so the other countries stay off this list rather than being guessed.
const LAWS: readonly BitcoinLaw[] = [
  {
    country: "SV",
    status: "permitted",
    source: "https://www.jurisprudencia.gob.sv/DocumentosBoveda/R/2/2020-2029/2021/06/1080B6.HTML",
    checked: "2026-11-20",
    note: "Decree 199 of 29 January 2025 makes private acceptance voluntary. The state pays its own obligations in the currency they were contracted in.",
  },
];

const BY_COUNTRY = new Map(LAWS.map((law) => [law.country, law]));

/** The countries whose bitcoin law has been checked against a primary source. */
export function bitcoinLaws(): readonly BitcoinLaw[] {
  return LAWS;
}

export function bitcoinLaw(country: string): BitcoinLaw | null {
  return BY_COUNTRY.get(country.toUpperCase()) ?? null;
}
