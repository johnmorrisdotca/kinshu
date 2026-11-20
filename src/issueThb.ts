import type { Issue } from "./types";

const checked = "2026-11-20";
const series =
  "https://www.bot.or.th/en/our-roles/banknotes/History-and-Series-of-Banknote-And-Commemorative/banknotes-series/banknote-series17.html";
const polymer =
  "https://www.bot.or.th/en/news-and-media/news/news-20250829.html";

function note(
  minor: number,
  name: string,
  from: string,
  source: string,
  text: string,
): Issue {
  return {
    code: "THB",
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
    note: text,
  };
}

const seriesNote =
  "Bank of Thailand, banknote series 17, read 20 November 2026. This page dates series 17 only. It does not date earlier series.";

export const THB_ISSUES: Issue[] = [
  note(2000, "20 baht note, series 17 paper", "2018-07-28", series, seriesNote),
  note(
    2000,
    "20 baht note, series 17 polymer",
    "2022-03-24",
    series,
    "Bank of Thailand, banknote series 17, read 20 November 2026. Polymer issue date 24 March 2022.",
  ),
  note(5000, "50 baht note, series 17 paper", "2018-07-28", series, seriesNote),
  note(
    5000,
    "50 baht note, series 17 polymer",
    "2025-11-21",
    polymer,
    "Bank of Thailand news, 29 August 2025. The 50 baht polymer note is issued on 21 November 2025. The existing and previous series remain legal tender.",
  ),
  note(10000, "100 baht note, series 17 paper", "2018-07-28", series, seriesNote),
  note(
    10000,
    "100 baht note, series 17 polymer",
    "2025-11-21",
    polymer,
    "Bank of Thailand news, 29 August 2025. The 100 baht polymer note is issued on 21 November 2025. The existing and previous series remain legal tender.",
  ),
  note(50000, "500 baht note, series 17", "2018-07-28", series, seriesNote),
  note(100000, "1,000 baht note, series 17", "2018-07-28", series, seriesNote),
];
