import type { CashSeries, NoteCensus, Redenomination, WithdrawnCash } from "./types";

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

function laterEuro(country: string, from: string, ratio: string, on: string, reg: string): Redenomination {
  return {
    country,
    from,
    to: "EUR",
    ratio,
    on,
    source: `https://eur-lex.europa.eu/eli/reg/${reg}/oj/eng`,
    checked: "2026-11-20",
    note: `The English text of this regulation prints the rate with a comma. It fixes this many units of the old currency as one euro from ${on}. The date cash stopped is the country's CLDR tenure, not this regulation.`,
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
  laterEuro("GR", "GRD", "340.750", "2001-01-01", "2000/1478"),
  laterEuro("SI", "SIT", "239.640", "2007-01-01", "2006/1086"),
  laterEuro("CY", "CYP", "0.585274", "2008-01-01", "2007/1135"),
  laterEuro("MT", "MTL", "0.429300", "2008-01-01", "2007/1134"),
  laterEuro("SK", "SKK", "30.1260", "2009-01-01", "2008/694"),
  laterEuro("EE", "EEK", "15.6466", "2011-01-01", "2010/671"),
  laterEuro("LV", "LVL", "0.702804", "2014-01-01", "2013/870"),
  laterEuro("LT", "LTL", "3.45280", "2015-01-01", "2014/851"),
  laterEuro("HR", "HRK", "7.53450", "2023-01-01", "2022/1208"),
  laterEuro("BG", "BGN", "1.95583", "2026-01-01", "2025/1409"),
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
    country: "BR",
    from: "BRR",
    to: "BRL",
    ratio: "2750",
    on: "1994-07-01",
    source: "https://www.bcb.gov.br/cedulasemoedas/cedulasemitidas",
    checked: "2026-11-20",
    note: "Banco Central do Brasil, cédulas produzidas, read 20 November 2026. On 1 July 1994 one URV became one real. The page states 1 URV = 2.750 cruzeiros reais = 1 real. The dot is the thousands separator.",
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

const MEXICO_CATALOGUE =
  "https://www.banxico.org.mx/billetes-y-monedas/d/%7BC721EF4D-E82E-280E-46DE-4F52E9C02DEC%7D.pdf";

function mexicoSeries(kind: "note" | "coin", name: string, currency: string, note: string): CashSeries {
  return {
    country: "MX",
    currency,
    kind,
    name,
    source: MEXICO_CATALOGUE,
    checked: "2026-11-20",
    note: `Banco de México, Catálogo de billetes y monedas, 13 May 2026. ${note}`,
  };
}

export const SERIES: readonly CashSeries[] = [
  mexicoSeries(
    "note",
    "AA",
    "MXP",
    "Type AA notes were being withdrawn in 1992. They are demonetized because they belong to the monetary unit in force until 31 December 1992.",
  ),
  mexicoSeries(
    "note",
    "A",
    "MXP",
    "Type A notes are the denominations put into circulation during 1992. They are demonetized because they belong to the monetary unit in force until 31 December 1992.",
  ),
  mexicoSeries(
    "note",
    "B",
    "MXN",
    "Type B notes are like type A, denominated in nuevos pesos. They are in the process of withdrawal.",
  ),
  mexicoSeries(
    "note",
    "C",
    "MXN",
    "Type C notes differ from type B and are denominated in nuevos pesos. They are in the process of withdrawal.",
  ),
  mexicoSeries(
    "note",
    "D",
    "MXN",
    "Type D notes are like type C, expressed in pesos of the unit now in force. They are in the process of withdrawal.",
  ),
  mexicoSeries(
    "note",
    "F",
    "MXN",
    "Type F notes were issued to replace type D, in pesos of the unit now in force. This type list does not say they are withdrawn.",
  ),
  mexicoSeries(
    "note",
    "G",
    "MXN",
    "Type G notes were issued to replace type F, in pesos of the unit now in force. This type list does not say they are withdrawn.",
  ),
  mexicoSeries(
    "coin",
    "AA",
    "MXP",
    "Type AA coins were being withdrawn in 1992. They are demonetized because they belong to the monetary unit in force until 31 December 1992.",
  ),
  mexicoSeries(
    "coin",
    "A",
    "MXP",
    "Type A coins are the denominations in circulation during 1992. They are demonetized because they belong to the monetary unit in force until 31 December 1992.",
  ),
  mexicoSeries(
    "coin",
    "B",
    "MXN",
    "Type B coins differ from type A and are expressed in nuevos pesos. The ones named in annex 2 are in the process of withdrawal.",
  ),
  mexicoSeries(
    "coin",
    "C",
    "MXN",
    "Type C coins are like type B. The ones named in annex 2 are in the process of withdrawal.",
  ),
  mexicoSeries(
    "coin",
    "D",
    "MXN",
    "Type D coins were issued to replace the type C coins of 10, 20 and 50 centavos.",
  ),
];
