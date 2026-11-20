import type { Issue } from "./types";

const checked = "2026-11-20";
const series = "https://www.snb.ch/en/the-snb/mandates-goals/cash/series-9";
const fiftyRelease =
  "https://www.snb.ch/public/asset/en/www-snb-ch/publications/communication/press-releases/2019/pre_20190903/publications0_en/pre_20190903.en.pdf";

const shared =
  "Swiss National Bank, ninth banknote series, read 20 November 2026. The page gives this date of issue. It does not date the eighth series. The 15 May 2020 release says eighth-series notes remain legal tender until they are recalled, and this reading did not include a recall notice.";

function note(minor: number, name: string, from: string, text: string): Issue {
  return {
    code: "CHF",
    kind: "note",
    minor,
    from,
    issuedTo: null,
    tenderTo: null,
    stillTender: true,
    honoured: false,
    asOf: null,
    name,
    source: series,
    checked,
    note: text,
  };
}

export const CHF_ISSUES: Issue[] = [
  note(
    5000,
    "50 franc note, ninth series",
    "2016-04-12",
    `Swiss National Bank, ninth banknote series, read 20 November 2026. Date of issue: 12 April 2016. The 3 September 2019 press release (${fiftyRelease}) says this note entered circulation on 13 April 2016. The series page is the date stored.`,
  ),
  note(2000, "20 franc note, ninth series", "2017-05-17", shared),
  note(1000, "10 franc note, ninth series", "2017-10-18", shared),
  note(20000, "200 franc note, ninth series", "2018-08-22", shared),
  note(100000, "1000 franc note, ninth series", "2019-03-13", shared),
  note(10000, "100 franc note, ninth series", "2019-09-12", shared),
];
