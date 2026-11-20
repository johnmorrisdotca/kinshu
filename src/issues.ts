import { CASH } from "./cash/registry";
import { currency } from "./currency";
import { fromMinor } from "./minor";
import { ISSUE_FACTS } from "./issueFacts";
import type { Issue, IssueStanding, PieceKind } from "./types";

const KNOWN = new Set(ISSUE_FACTS.map((issue) => `${issue.code}:${issue.kind}:${issue.minor}`));

function listedName(code: string, minor: number, kind: PieceKind): string {
  const exponent = currency(code)?.exponent ?? 0;
  const major = fromMinor(minor, exponent);
  const amount = Number.isInteger(major) ? String(major) : String(major);
  return `${amount} ${kind}`;
}

function listedFromCash(): Issue[] {
  const rows: Issue[] = [];
  for (const cash of Object.values(CASH)) {
    const add = (minor: number, kind: PieceKind) => {
      if (KNOWN.has(`${cash.code}:${kind}:${minor}`)) return;
      rows.push({
        code: cash.code,
        minor,
        kind,
        from: null,
        issuedTo: null,
        tenderTo: null,
        stillTender: true,
        honoured: false,
        asOf: cash.checked,
        name: listedName(cash.code, minor, kind),
        source: cash.source,
        checked: cash.checked,
        note: `The issuer listed this ${kind} on ${cash.checked}. That page does not give the year it began, so a past year does not assume it existed.`,
      });
    };
    for (const minor of cash.notes) add(minor, "note");
    for (const minor of cash.coins) add(minor, "coin");
  }
  return rows;
}

let catalogue: readonly Issue[] | null = null;

function everyIssue(): readonly Issue[] {
  catalogue ??= [...ISSUE_FACTS, ...listedFromCash()];
  return catalogue;
}

function startOf(value: string): string {
  if (/^\d{4}$/.test(value)) return `${value}-01-01`;
  if (/^\d{4}-\d{2}$/.test(value)) return `${value}-01`;
  return value;
}

function endOf(value: string): string {
  if (/^\d{4}$/.test(value)) return `${value}-12-31`;
  if (/^\d{4}-\d{2}$/.test(value)) {
    const [year, month] = value.split("-").map(Number);
    const last = new Date(Date.UTC(year, month, 0)).getUTCDate();
    return `${value}-${String(last).padStart(2, "0")}`;
  }
  return value;
}

function querySpan(on: string): { start: string; end: string } {
  if (/^\d{4}$/.test(on)) return { start: `${on}-01-01`, end: `${on}-12-31` };
  if (/^\d{4}-\d{2}$/.test(on)) return { start: `${on}-01`, end: endOf(on) };
  return { start: on, end: on };
}

/** Where this denomination stood on a year (`1980`) or a day (`1980-07-01`). */
export function issueStanding(issue: Issue, on: string): IssueStanding {
  const span = querySpan(on);
  if (issue.asOf) {
    return span.end < `${issue.asOf.slice(0, 4)}-01-01` ? "unlisted" : "issued";
  }
  const printStart = issue.from ? startOf(issue.from) : null;
  const printEnd = issue.issuedTo ? endOf(issue.issuedTo) : null;
  if (printStart && span.end < printStart) return "before";
  const overlapsPrint = printEnd === null ? printStart !== null : span.start <= printEnd;
  if (overlapsPrint && (printStart === null || span.end >= printStart)) return "issued";
  const tenderEnd = issue.tenderTo ? endOf(issue.tenderTo) : null;
  if (tenderEnd && span.start <= tenderEnd && (printStart === null || span.end >= printStart)) return "tender";
  if (issue.stillTender && (printStart === null || span.end >= printStart)) return "tender";
  if (tenderEnd && span.start > tenderEnd) return issue.honoured ? "honoured" : "ended";
  if (printEnd && span.start > printEnd) return "unknown";
  return "unknown";
}

/** Every recorded note and coin for this currency, including ones a past year must not assume. */
export function issues(code: string): readonly Issue[] {
  const key = code.toUpperCase();
  return everyIssue().filter((issue) => issue.code === key);
}

/** Notes and coins that were legal tender on that year or day. */
export function issuesAt(code: string, on: string): readonly Issue[] {
  return issues(code).filter((issue) => {
    const standing = issueStanding(issue, on);
    return standing === "issued" || standing === "tender";
  });
}
