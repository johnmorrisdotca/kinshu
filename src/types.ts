// A generated currency is a short row, the same way Kuni stores a country, so the file stays data.

export type CurrencyRow = readonly [
  code: string,
  en: string,
  ja: string,
  symbol: string,
  exponent: number,
  cashStep: number,
  tender: readonly string[],
];

export interface CurrencyName {
  en: string;
  ja: string;
}

export interface Currency {
  code: string;
  name: CurrencyName;
  symbol: string;
  /** Minor-unit digits. Yen is 0, the dollar is 2, the Bahraini dinar is 3. */
  exponent: number;
  /**
   * Cash rounding step in minor units, from CLDR. Canada's is 5. A currency whose
   * checked cash file names its own step uses that file for a breakdown.
   */
  cashStep: number;
  /** Alpha-2 codes of the places where this is legal tender now. */
  tender: readonly string[];
}

export type PieceKind = "note" | "coin";

export interface Piece {
  minor: number;
  kind: PieceKind;
}

export interface CountedPiece extends Piece {
  count: number;
}

/** Circulating notes and coins, in minor units, largest first. */
export interface CashSet {
  code: string;
  notes: readonly number[];
  coins: readonly number[];
  /** The round amount a person quotes, in minor units. Yen's is 10000. */
  everyday: number;
  /** Cash rounding step in minor units. */
  increment: number;
  source: string;
  checked: string;
}

export interface MoneyParts {
  /** The currency sign. It is not unique: Canada and the US both use $. */
  sign: string;
  /** The digits in front of the minor units, with a leading minus when the amount is negative. */
  whole: string;
  /** The minor digits, padded. Absent when the exponent is 0. */
  fraction: string | null;
}

export interface CashBreakdown {
  exactMinor: number;
  cashMinor: number;
  parts: MoneyParts;
  pieces: readonly CountedPiece[];
}

export interface AcceptedPlace {
  country: string;
  source: string;
  checked: string;
}

/** tender is still the law. permitted is legal to hold and use. restricted limits who may. banned forbids it. */
export type BitcoinStatus = "tender" | "permitted" | "restricted" | "banned";

export type TenureRow = readonly [
  country: string,
  code: string,
  from: string | null,
  to: string | null,
  tender: boolean,
];

export interface Tenure {
  country: string;
  code: string;
  /** ISO date CLDR gives, or null when CLDR gives none. */
  from: string | null;
  /** ISO date the spell ended, or null while CLDR still lists it. */
  to: string | null;
  tender: boolean;
}

export interface Redenomination {
  country: string;
  from: string;
  to: string;
  /** Units of the old currency for one unit of the new one, as the source prints them. */
  ratio: string;
  on: string;
  source: string;
  checked: string;
  note: string;
}

export interface WithdrawnCash {
  country: string;
  currency: string;
  kind: "note" | "coin";
  name: string;
  /** The day it stopped being legal tender. */
  on: string;
  source: string;
  checked: string;
  note: string;
}

export type IssueStanding = "before" | "issued" | "tender" | "honoured" | "ended" | "unknown" | "unlisted";

export interface Issue {
  code: string;
  minor: number;
  kind: PieceKind;
  /** First day this denomination was issued. Null when the source gives no start. */
  from: string | null;
  /** Last day it was printed or minted. Null while the source says it is still issued. */
  issuedTo: string | null;
  /** Last day of legal tender. Null when that day is not stated. */
  tenderTo: string | null;
  /** The source says it is still legal tender. */
  stillTender: boolean;
  /** The source says the issuer still redeems it after legal tender ended. */
  honoured: boolean;
  /**
   * Set when this row is only the issuer's list on that day, not a start date.
   * A year before that day does not count the piece.
   */
  asOf: string | null;
  name: string;
  source: string;
  checked: string;
  note: string;
}

export interface NoteCensus {
  country: string;
  currency: string;
  /** Kinds the issuer says it has issued. */
  issued: number;
  /** Kinds the issuer says are still valid, including ones no longer issued. */
  valid: number;
  /** Kinds the issuer says can no longer be used. */
  withdrawn: number;
  source: string;
  checked: string;
  note: string;
}

export interface BitcoinLaw {
  country: string;
  status: BitcoinStatus;
  source: string;
  checked: string;
  /** What the source actually says, in English. */
  note: string;
}
