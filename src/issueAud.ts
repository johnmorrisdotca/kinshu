import type { Issue } from "./types";

const checked = "2026-11-20";
const source =
  "https://banknotes.rba.gov.au/australias-banknotes/next-generation-banknotes-program/";

const note =
  "Reserve Bank of Australia, Next Generation Banknote Program, read 20 November 2026. All banknotes issued by the Reserve Bank remain legal tender. This page dates the next-generation series. It does not date the earlier series.";

function issued(minor: number, name: string, from: string): Issue {
  return {
    code: "AUD",
    kind: "note",
    minor,
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

export const AUD_ISSUES: Issue[] = [
  issued(500, "5 dollar note, next generation", "2016-09-01"),
  issued(1000, "10 dollar note, next generation", "2017-09-20"),
  issued(5000, "50 dollar note, next generation", "2018-10-18"),
  issued(2000, "20 dollar note, next generation", "2019-10-09"),
  issued(10000, "100 dollar note, next generation", "2020-10-29"),
];
