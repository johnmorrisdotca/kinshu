import { AUD_ISSUES } from "./issueAud";
import { BRL_ISSUES } from "./issueBrl";
import { CHF_ISSUES } from "./issueChf";
import { CNY_ISSUES } from "./issueCny";
import { EUR_ISSUES } from "./issueEur";
import { INR_ISSUES } from "./issueInr";
import { GBP_ISSUES } from "./issueGbp";
import { JPY_ISSUES } from "./issueJpy";
import { KRW_ISSUES } from "./issueKrw";
import { MXN_ISSUES } from "./issueMxn";
import { THB_ISSUES } from "./issueThb";
import type { Issue } from "./types";

const checked = "2026-11-20";

const CANADA_TENDER = "https://www.bankofcanada.ca/2021/01/about-legal-tender/";
const CANADA_ART = "https://www.bankofcanada.ca/wp-content/uploads/2010/07/promo_art.pdf";
const MINT_CENT = "https://www.mint.ca/en/discover/canadian-circulation/1-cent";
const MINT_DOLLAR = "https://www.mint.ca/en/discover/canadian-circulation/1-dollar";
const MINT_TWO = "https://www.mint.ca/en/discover/canadian-circulation/2-dollars";
const US_HIGH = "https://www.bep.gov/currency/history/historical-currency";
const US_NOTES = "https://www.bep.gov/system/files/2022-02/currency-notes-508.pdf";

const SERIES =
  "This row is the denomination, not each redesign. The Bank of Canada art book describes the 1935 portraits; later series changed them and are not listed one by one.";

function row(issue: Issue): Issue {
  return issue;
}

function canadaNote(
  minor: number,
  name: string,
  from: string,
  issuedTo: string | null,
  tenderTo: string | null,
  honoured: boolean,
  note: string,
): Issue {
  return row({
    code: "CAD",
    minor,
    kind: "note",
    from,
    issuedTo,
    tenderTo,
    stillTender: tenderTo === null && !honoured,
    honoured,
    asOf: null,
    name,
    source: CANADA_TENDER,
    checked,
    note: `${note} Start date: ${CANADA_ART}. ${SERIES}`,
  });
}

const canadaCalled =
  "On 1 January 2021 this denomination stopped being legal tender. The Bank of Canada still honours it at face value.";

export const ISSUE_FACTS: readonly Issue[] = [
  canadaNote(
    100,
    "1 dollar note",
    "1935-03-11",
    "1989",
    "2020-12-31",
    true,
    `The 1935 note shows King George V. The Bank stopped issuing the 1 dollar note in 1989 and replaced it with a coin. ${canadaCalled}`,
  ),
  canadaNote(
    200,
    "2 dollar note",
    "1935-03-11",
    "1996",
    "2020-12-31",
    true,
    `The 1935 note shows Queen Mary. The Bank stopped issuing the 2 dollar note in 1996 and replaced it with a coin. ${canadaCalled}`,
  ),
  canadaNote(
    500,
    "5 dollar note",
    "1935-03-11",
    null,
    null,
    false,
    "The 1935 note shows Edward, Prince of Wales. The Bank has no plan to remove this denomination from legal tender.",
  ),
  canadaNote(
    1000,
    "10 dollar note",
    "1935-03-11",
    null,
    null,
    false,
    "The 1935 note shows Princess Mary. The Bank has no plan to remove this denomination from legal tender.",
  ),
  canadaNote(
    2000,
    "20 dollar note",
    "1935-03-11",
    null,
    null,
    false,
    "The 1935 note shows Princess Elizabeth at age eight. The Bank has no plan to remove this denomination from legal tender.",
  ),
  canadaNote(
    2500,
    "25 dollar note",
    "1935-05-06",
    "1935",
    "2020-12-31",
    true,
    `Issued on 6 May 1935 for the silver jubilee of King George V. The only 25 dollar note the Bank issued. It was discontinued shortly after. ${canadaCalled}`,
  ),
  canadaNote(
    5000,
    "50 dollar note",
    "1935-03-11",
    null,
    null,
    false,
    "The 1935 note shows Prince Albert, Duke of York. The Bank has no plan to remove this denomination from legal tender.",
  ),
  canadaNote(
    10000,
    "100 dollar note",
    "1935-03-11",
    null,
    null,
    false,
    "The 1935 note shows Prince Henry, Duke of Gloucester. The Bank has no plan to remove this denomination from legal tender.",
  ),
  canadaNote(
    50000,
    "500 dollar note",
    "1935-03-11",
    "1935",
    "2020-12-31",
    true,
    `The only 500 dollar note the Bank issued, showing Sir John A. Macdonald. The 1935 series was the last to include it. ${canadaCalled}`,
  ),
  canadaNote(
    100000,
    "1,000 dollar note",
    "1935-03-11",
    "2000",
    "2020-12-31",
    true,
    `The 1935 note shows Sir Wilfrid Laurier. The Bank stopped issuing the 1,000 dollar note in 2000. ${canadaCalled}`,
  ),
  row({
    code: "CAD",
    minor: 1,
    kind: "coin",
    from: "1908-01-02",
    issuedTo: "2012-05",
    tenderTo: null,
    stillTender: false,
    honoured: false,
    asOf: null,
    name: "1 cent coin",
    source: MINT_CENT,
    checked,
    note: "The Royal Canadian Mint says the first 1 cent coin was struck on 2 January 1908, and that it ended production in May 2012. That page does not say whether the coin is still legal tender.",
  }),
  row({
    code: "CAD",
    minor: 100,
    kind: "coin",
    from: "1987",
    issuedTo: null,
    tenderTo: null,
    stillTender: true,
    honoured: false,
    asOf: null,
    name: "1 dollar coin",
    source: MINT_DOLLAR,
    checked,
    note: "Introduced in 1987 to replace the 1 dollar note. The Mint still lists it as a circulation coin.",
  }),
  row({
    code: "CAD",
    minor: 200,
    kind: "coin",
    from: "1996-02-19",
    issuedTo: null,
    tenderTo: null,
    stillTender: true,
    honoured: false,
    asOf: null,
    name: "2 dollar coin",
    source: MINT_TWO,
    checked,
    note: "Introduced on 19 February 1996 to replace the 2 dollar note. The Mint still lists it as a circulation coin.",
  }),
  ...[500, 1000, 2000, 5000, 10000].map((minor) =>
    row({
      code: "USD",
      minor,
      kind: "note" as const,
      from: "1914",
      issuedTo: null,
      tenderTo: null,
      stillTender: true,
      honoured: false,
      asOf: null,
      name: `${minor / 100} dollar note`,
      source: US_NOTES,
      checked,
      note: "The Bureau of Engraving and Printing says the 1914 Federal Reserve notes included this denomination, and that the notes issued today go up to 100 dollars.",
    }),
  ),
  row({
    code: "USD",
    minor: 100,
    kind: "note",
    from: "1963",
    issuedTo: null,
    tenderTo: null,
    stillTender: true,
    honoured: false,
    asOf: null,
    name: "1 dollar note",
    source: US_NOTES,
    checked,
    note: "The Bureau says 1 dollar Federal Reserve notes were introduced in 1963. It has no plan to redesign the 1 dollar note.",
  }),
  row({
    code: "USD",
    minor: 200,
    kind: "note",
    from: "1976",
    issuedTo: null,
    tenderTo: null,
    stillTender: true,
    honoured: false,
    asOf: null,
    name: "2 dollar note",
    source: US_NOTES,
    checked,
    note: "The Bureau says 2 dollar Federal Reserve notes began circulating with the 1976 series. It has no plan to redesign the 2 dollar note. The everyday cash list leaves this note out because it is rarely given as change.",
  }),
  ...[50000, 100000, 500000, 1000000].map((minor) =>
    row({
      code: "USD",
      minor,
      kind: "note" as const,
      from: "1914",
      issuedTo: "1945",
      tenderTo: null,
      stillTender: true,
      honoured: false,
      asOf: null,
      name: `${minor / 100} dollar note`,
      source: US_HIGH,
      checked,
      note: "Last printed in 1945. The Treasury and the Federal Reserve stopped issuing them on 14 July 1969. They remain legal tender.",
    }),
  ),
  row({
    code: "USD",
    minor: 10000000,
    kind: "note",
    from: "1934-12-18",
    issuedTo: "1935-01-09",
    tenderTo: null,
    stillTender: false,
    honoured: false,
    asOf: null,
    name: "100,000 dollar gold certificate",
    source: US_HIGH,
    checked,
    note: "Series 1934. Printed from 18 December 1934 through 9 January 1935 for transfers between Federal Reserve Banks. It was not circulated among the public.",
  }),
  ...GBP_ISSUES,
  ...JPY_ISSUES,
  ...EUR_ISSUES,
  ...INR_ISSUES,
  ...AUD_ISSUES,
  ...BRL_ISSUES,
  ...CHF_ISSUES,
  ...MXN_ISSUES,
  ...CNY_ISSUES,
  ...KRW_ISSUES,
  ...THB_ISSUES,
];
