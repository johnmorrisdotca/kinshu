import type { Issue } from "./types";

const checked = "2026-11-20";
const source = "https://www.boj.or.jp/en/note_tfjgs/note/valid/issue.htm";

function jpy(minor: number, kind: "note" | "coin", from: string, name: string, note: string): Issue {
  return {
    code: "JPY",
    minor,
    kind,
    from,
    issuedTo: null,
    tenderTo: null,
    stillTender: true,
    honoured: false,
    asOf: null,
    name,
    source,
    checked,
    note,
  };
}

const listed = "The Bank of Japan lists this on its page of notes and coins currently issued.";

export const JPY_ISSUES: readonly Issue[] = [
  jpy(10000, "note", "2024-07-03", "10,000 yen note (2024)", `${listed} Date of first issue: 3 July 2024.`),
  jpy(10000, "note", "2004-11-01", "10,000 yen note (2004)", `${listed} Date of first issue: 1 November 2004.`),
  jpy(5000, "note", "2024-07-03", "5,000 yen note (2024)", `${listed} Date of first issue: 3 July 2024.`),
  jpy(5000, "note", "2004-11-01", "5,000 yen note (2004)", `${listed} Date of first issue: 1 November 2004.`),
  jpy(2000, "note", "2000-07-19", "2,000 yen note", `${listed} Date of first issue: 19 July 2000.`),
  jpy(1000, "note", "2024-07-03", "1,000 yen note (2024)", `${listed} Date of first issue: 3 July 2024.`),
  jpy(1000, "note", "2004-11-01", "1,000 yen note (2004)", `${listed} Date of first issue: 1 November 2004.`),
  jpy(500, "coin", "2021", "500 yen coin", `${listed} Year of first issue: 2021.`),
  jpy(100, "coin", "1967", "100 yen coin", `${listed} Year of first issue: 1967.`),
  jpy(50, "coin", "1967", "50 yen coin", `${listed} Year of first issue: 1967.`),
  jpy(10, "coin", "1959", "10 yen coin", `${listed} Year of first issue: 1959.`),
  jpy(5, "coin", "1959", "5 yen coin", `${listed} Year of first issue: 1959.`),
  jpy(1, "coin", "1955", "1 yen coin", `${listed} Year of first issue: 1955.`),
];
