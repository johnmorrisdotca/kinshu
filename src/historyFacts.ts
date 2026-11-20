import type { NoteCensus, Redenomination, WithdrawnCash } from "./types";

const EURO =
  "https://eur-lex.europa.eu/eli/reg/1998/2866/oj/eng";
const EURO_NOTE =
  "Council Regulation (EC) No 2866/98 fixes this many units of the old currency as one euro from 1 January 1999. The date cash stopped is the country's CLDR tenure, not this regulation.";

function euro(country: string, from: string, ratio: string): Redenomination {
  return {
    country,
    from,
    to: "EUR",
    ratio,
    on: "1999-01-01",
    source: EURO,
    checked: "2026-11-20",
    note: EURO_NOTE,
  };
}

export const REDENOMINATIONS: readonly Redenomination[] = [
  euro("AT", "ATS", "13.7603"),
  euro("BE", "BEF", "40.3399"),
  euro("DE", "DEM", "1.95583"),
  euro("ES", "ESP", "166.386"),
  euro("FI", "FIM", "5.94573"),
  euro("FR", "FRF", "6.55957"),
  euro("IE", "IEP", "0.787564"),
  euro("IT", "ITL", "1936.27"),
  euro("LU", "LUF", "40.3399"),
  euro("NL", "NLG", "2.20371"),
  euro("PT", "PTE", "200.482"),
  {
    country: "MX",
    from: "MXP",
    to: "MXN",
    ratio: "1000",
    on: "1993-01-01",
    source: "https://www.banxico.org.mx/banknotes-and-coins/demonetized-banknotes-and-coi.html",
    checked: "2026-11-20",
    note: "Banco de México says the peso unit in force until 31 December 1992 is worth one thousandth of its face value. Three zeros were removed for the unit that began on 1 January 1993.",
  },
  {
    country: "RO",
    from: "ROL",
    to: "RON",
    ratio: "10000",
    on: "2005-07-01",
    source: "https://legislatie.just.ro/Public/DetaliiDocumentAfis/53757",
    checked: "2026-11-20",
    note: "Law 348/2004. On 1 July 2005, 10,000 old lei became 1 leu. Old notes and coins stayed cash until 31 December 2006. The leu did not become the euro.",
  },
];

export const WITHDRAWN: readonly WithdrawnCash[] = [
  {
    country: "MX",
    currency: "MXP",
    kind: "note",
    name: "AA-type and A-type notes",
    on: "1996-01-01",
    source: "https://www.banxico.org.mx/banknotes-and-coins/demonetized-banknotes-and-coi.html",
    checked: "2026-11-20",
    note: "Banco de México: these notes of the unit in force until 31 December 1992 stopped being legal tender on 1 January 1996. Face value divided by 1,000.",
  },
  {
    country: "MX",
    currency: "MXP",
    kind: "coin",
    name: "AA-type and A-type coins",
    on: "1995-11-15",
    source: "https://www.banxico.org.mx/banknotes-and-coins/demonetized-banknotes-and-coi.html",
    checked: "2026-11-20",
    note: "Banco de México: these coins stopped being legal tender on 15 November 1995. Face value divided by 1,000.",
  },
];

export const NOTE_CENSUSES: readonly NoteCensus[] = [
  {
    country: "JP",
    currency: "JPY",
    issued: 56,
    valid: 25,
    withdrawn: 31,
    source: "https://www.boj.or.jp/en/about/education/oshiete/money/c07.htm",
    checked: "2026-11-20",
    note: "The Bank of Japan has issued 56 kinds of notes since 1885. 25 are still valid, including notes no longer issued. 31 can no longer be used. A note stops being valid only when the law says so: 1927, 1946, and 1953. The page counts kinds. It does not give a design history of each one.",
  },
];
