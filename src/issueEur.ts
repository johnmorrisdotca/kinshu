import type { Issue } from "./types";

const checked = "2026-11-20";
const current =
  "https://www.ecb.europa.eu/euro/banknotes/current/html/index.en.html";
const europa =
  "https://www.ecb.europa.eu/euro/banknotes/europa/html/index.en.html";
const kit =
  "https://www.ecb.europa.eu/euro/shared/files/150224_presskit_europa_en.pdf";
const tenRelease =
  "https://www.ecb.europa.eu/press/pr/date/2014/html/pr140922.en.html";

const firstSeries =
  "European Central Bank, current banknotes, read 20 November 2026. The first series was issued in 2002. It is still legal tender, will always retain its value, and can be exchanged for an unlimited period at euro-area national central banks. The page does not give the day in 2002.";

function first(minor: number, name: string): Issue {
  return {
    code: "EUR",
    kind: "note",
    minor,
    from: "2002",
    issuedTo: null,
    tenderTo: null,
    stillTender: true,
    honoured: true,
    asOf: null,
    name,
    source: current,
    checked,
    note: firstSeries,
  };
}

function europaNote(
  minor: number,
  name: string,
  from: string,
  source: string,
  note: string,
): Issue {
  return {
    code: "EUR",
    kind: "note",
    minor,
    from,
    issuedTo: null,
    tenderTo: null,
    stillTender: true,
    honoured: true,
    asOf: null,
    name,
    source,
    checked,
    note,
  };
}

export const EUR_ISSUES: Issue[] = [
  first(500, "5 euro note, first series"),
  first(1000, "10 euro note, first series"),
  first(2000, "20 euro note, first series"),
  first(5000, "50 euro note, first series"),
  first(10000, "100 euro note, first series"),
  first(20000, "200 euro note, first series"),
  {
    code: "EUR",
    kind: "note",
    minor: 50000,
    from: "2002",
    issuedTo: "2019-04-27",
    tenderTo: null,
    stillTender: true,
    honoured: true,
    asOf: null,
    name: "500 euro note, first series",
    source: current,
    checked,
    note: "European Central Bank, current banknotes, read 20 November 2026. Issued in 2002. Not included in the Europa series and not issued since 27 April 2019. It remains legal tender and will always retain its value.",
  },
  europaNote(
    500,
    "5 euro note, Europa series",
    "2013-05-02",
    kit,
    "European Central Bank press kit, 24 February 2015. The new 5 euro note was issued on 2 May 2013.",
  ),
  europaNote(
    1000,
    "10 euro note, Europa series",
    "2014-09-23",
    tenRelease,
    "European Central Bank press release, 22 September 2014. The 10 euro Europa note enters circulation on 23 September 2014.",
  ),
  europaNote(
    2000,
    "20 euro note, Europa series",
    "2015-11-25",
    kit,
    "European Central Bank press kit, 24 February 2015. The new 20 euro note will start circulating on 25 November 2015. The Europa series page later says it started in 2015.",
  ),
  europaNote(
    5000,
    "50 euro note, Europa series",
    "2017",
    europa,
    "European Central Bank, Europa series, read 20 November 2026. The 50 euro note started circulating in 2017. The page does not give the day.",
  ),
  europaNote(
    10000,
    "100 euro note, Europa series",
    "2019-05-28",
    europa,
    "European Central Bank, Europa series, read 20 November 2026. The 100 euro note started circulating on 28 May 2019.",
  ),
  europaNote(
    20000,
    "200 euro note, Europa series",
    "2019-05-28",
    europa,
    "European Central Bank, Europa series, read 20 November 2026. The 200 euro note started circulating on 28 May 2019.",
  ),
];
