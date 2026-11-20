import type { Issue, PieceKind } from "./types";

const checked = "2026-11-20";
const hundred =
  "https://www.pbc.gov.cn/rmyh/xbrmb/index_english.html";
const edition2019 = "https://www.pbc.gov.cn/rmyh/2019rmb/index.html";
const five =
  "https://www.pbc.gov.cn/en/3688241/3688663/3721229/2025080817515097294/index.html";

function row(
  kind: PieceKind,
  minor: number,
  name: string,
  from: string | null,
  asOf: string | null,
  source: string,
  note: string,
): Issue {
  return {
    code: "CNY",
    kind,
    minor,
    from,
    issuedTo: null,
    tenderTo: null,
    stillTender: true,
    honoured: false,
    asOf,
    name,
    source,
    checked,
    note,
  };
}

export const CNY_ISSUES: Issue[] = [
  row(
    "note",
    10000,
    "100 yuan note, 2015 edition",
    "2015-11-12",
    null,
    hundred,
    "People's Bank of China, read 20 November 2026. The 2015 edition 100 yuan note was issued on 12 November 2015. It circulates in parallel with previous editions at the same face value.",
  ),
  row(
    "note",
    10000,
    "100 yuan note, earlier edition",
    null,
    "2015-11-12",
    hundred,
    "People's Bank of China, read 20 November 2026. Previous 100 yuan editions were still circulating on 12 November 2015. The page does not give their first issue date, so a year before 2015 stays unlisted.",
  ),
  row(
    "note",
    5000,
    "50 yuan note, 2019 edition",
    "2019-08-30",
    null,
    edition2019,
    "People's Bank of China, fifth series 2019 edition, read 20 November 2026. Issued beginning 30 August 2019. It circulates in parallel as an equal with previous editions of the same face value.",
  ),
  row(
    "note",
    2000,
    "20 yuan note, 2019 edition",
    "2019-08-30",
    null,
    edition2019,
    "People's Bank of China, fifth series 2019 edition, read 20 November 2026. Issued beginning 30 August 2019, in parallel with previous editions.",
  ),
  row(
    "note",
    1000,
    "10 yuan note, 2019 edition",
    "2019-08-30",
    null,
    edition2019,
    "People's Bank of China, fifth series 2019 edition, read 20 November 2026. Issued beginning 30 August 2019, in parallel with previous editions.",
  ),
  row(
    "note",
    100,
    "1 yuan note, 2019 edition",
    "2019-08-30",
    null,
    edition2019,
    "People's Bank of China, fifth series 2019 edition, read 20 November 2026. Issued beginning 30 August 2019, in parallel with previous editions.",
  ),
  row(
    "coin",
    100,
    "1 yuan coin, 2019 edition",
    "2019-08-30",
    null,
    edition2019,
    "People's Bank of China, fifth series 2019 edition, read 20 November 2026. Issued beginning 30 August 2019, in parallel with previous editions.",
  ),
  row(
    "coin",
    50,
    "5 jiao coin, 2019 edition",
    "2019-08-30",
    null,
    edition2019,
    "People's Bank of China, fifth series 2019 edition, read 20 November 2026. Issued beginning 30 August 2019, in parallel with previous editions.",
  ),
  row(
    "coin",
    10,
    "1 jiao coin, 2019 edition",
    "2019-08-30",
    null,
    edition2019,
    "People's Bank of China, fifth series 2019 edition, read 20 November 2026. Issued beginning 30 August 2019, in parallel with previous editions.",
  ),
  row(
    "note",
    500,
    "5 yuan note, 2020 edition",
    "2020-11-05",
    null,
    five,
    "People's Bank of China, Announcement No. 9 of 2020, dated 3 July 2020. The fifth-series 5 yuan note, 2020 edition, is issued from 5 November 2020 and circulates alongside existing notes of the same denomination.",
  ),
  row(
    "note",
    500,
    "5 yuan note, earlier edition",
    null,
    "2020-11-05",
    five,
    "People's Bank of China, Announcement No. 9 of 2020. Existing 5 yuan notes were still circulating on 5 November 2020. The announcement does not give their first issue date, so a year before 2020 stays unlisted.",
  ),
];
