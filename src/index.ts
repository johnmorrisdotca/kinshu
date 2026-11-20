import { breakdown } from "./breakdown";
import { CASH } from "./cash/registry";
import { currency } from "./currency";
import { cashRound, fromMinor, toMinor } from "./minor";
import { parts } from "./parts";
import type { CashBreakdown, CashSet, Currency, Piece } from "./types";

export { bitcoinLaw, bitcoinLaws } from "./bitcoin";
export { breakdown } from "./breakdown";
export { CASH } from "./cash/registry";
export { currencies, currency, isCurrencyCode } from "./currency";
export { former, noteCensus, redenominations, series, tenures, withdrawn } from "./history";
export { issueStanding, issues, issuesAt } from "./issues";
export { cashRound, fromMinor, toMinor } from "./minor";
export { parts } from "./parts";
export { accepted, currenciesOf, tender } from "./places";
export type {
  AcceptedPlace,
  BitcoinLaw,
  BitcoinStatus,
  CashBreakdown,
  CashSeries,
  CashSet,
  CountedPiece,
  Currency,
  CurrencyName,
  Issue,
  IssueStanding,
  MoneyParts,
  NoteCensus,
  Piece,
  PieceKind,
  Redenomination,
  Tenure,
  TenureRow,
  WithdrawnCash,
} from "./types";

export const VERSION = "0.1.0";

function piecesOf(cash: CashSet): Piece[] {
  return [
    ...cash.notes.map((minor) => ({ minor, kind: "note" as const })),
    ...cash.coins.map((minor) => ({ minor, kind: "coin" as const })),
  ];
}

/**
 * The exact amount, the cash-rounded amount, and the notes and coins.
 * Null when that currency has no checked cash file yet.
 */
export function cashBreakdown(amount: number, code: string): CashBreakdown | null {
  const item = currency(code);
  const cash = CASH[code.toUpperCase()];
  if (item === null || cash === undefined) return null;
  const exactMinor = toMinor(amount, item.exponent);
  const cashMinor = cashRound(exactMinor, cash.increment);
  return {
    exactMinor,
    cashMinor,
    parts: parts(fromMinor(exactMinor, item.exponent), item),
    pieces: breakdown(cashMinor, piecesOf(cash)),
  };
}

/** Identity, tender places, and the cash file when one has been checked. */
export function quote(code: string): (Currency & { cash: CashSet | null }) | null {
  const item = currency(code);
  if (item === null) return null;
  return { ...item, cash: CASH[item.code] ?? null };
}
