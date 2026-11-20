import type { Issue } from "./types";

const checked = "2026-11-20";
const circular =
  "https://www.banxico.org.mx/marco-normativo/normativa-emitida-por-el-banco-de-mexico/circular-operaciones-de-caja/%7B2F749411-2BF0-719E-2D17-C5EF2FD1D89F%7D.pdf";
const catalogue =
  "https://www.banxico.org.mx/billetes-y-monedas/d/%7BC721EF4D-E82E-280E-46DE-4F52E9C02DEC%7D.pdf";

function row(
  minor: number,
  name: string,
  from: string,
  issuedTo: string | null,
  source: string,
  note: string,
): Issue {
  return {
    code: "MXN",
    kind: "note",
    minor,
    from,
    issuedTo,
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

const open =
  "Banco de México, Circular 7/2025, 25 August 2025. This is the puesta en circulación date. The 13 May 2026 catalogue does not put this note in the process of withdrawal.";

export const MXN_ISSUES: Issue[] = [
  row(5000, "50 peso note, type F, polymer", "2006-11-15", "2023-06-14", circular, "Banco de México, Circular 7/2025. Put into circulation 15 November 2006. Annex 25C.23 of 14 June 2023 is the withdrawal from circulation of the 50 peso type F notes. The 13 May 2026 catalogue still lists the 50 peso polymer type F notes as in the process of withdrawal, which is not demonetization."),
  row(2000, "20 peso note, type F, polymer", "2007-08-13", null, catalogue, "Banco de México, Circular 7/2025, gives 13 August 2007 as the puesta en circulación of the new 20 peso polymer note. The 13 May 2026 catalogue says the 20 peso polymer type F notes are in the process of withdrawal and does not give the day that began."),
  row(100000, "1000 peso note, type F", "2008-03-31", "2020-11-19", circular, "Banco de México, Circular 7/2025. Put into circulation 31 March 2008. Annex 25C.20 of 19 November 2020 puts the 1000 peso type F note into the process of withdrawal. That is not demonetization."),
  row(20000, "200 peso note, type F", "2008-09-01", null, circular, open),
  row(10000, "100 peso note, type F, independence commemorative", "2009-09-23", null, circular, "Banco de México, Circular 7/2025. Put into circulation 23 September 2009, commemorating the start of independence and the revolution."),
  row(20000, "200 peso note, type F, independence commemorative", "2009-09-23", null, circular, "Banco de México, Circular 7/2025. Put into circulation 23 September 2009, commemorating the start of independence and the revolution."),
  row(10000, "100 peso note, type F", "2010-08-09", null, circular, open),
  row(50000, "500 peso note, type F", "2010-08-30", null, circular, open),
  row(5000, "50 peso note, type F1", "2013-05-06", "2023-06-14", circular, "Banco de México, Circular 7/2025. Put into circulation 6 May 2013. Annex 25C.23 of 14 June 2023 withdraws the 50 peso type F notes from circulation. The type heading says type F includes type F1."),
  row(10000, "100 peso note, type F, constitution commemorative", "2017-02-05", null, circular, "Banco de México, Circular 7/2025. Put into circulation 5 February 2017, commemorating the 1917 constitution."),
  row(50000, "500 peso note, type G", "2018-08-27", null, circular, open),
  row(20000, "200 peso note, type G", "2019-09-02", null, circular, open),
  row(10000, "100 peso note, type G", "2020-11-12", null, circular, open),
  row(100000, "1000 peso note, type G", "2020-11-19", null, circular, open),
  row(2000, "20 peso note, type G, independence commemorative", "2021-09-24", null, circular, "Banco de México, Circular 7/2025. Put into circulation 24 September 2021. This is the type G 20 peso note, commemorating the bicentennial of independence."),
  row(5000, "50 peso note, type G", "2021-10-28", null, circular, open),
  row(20000, "200 peso note, type G, autonomy commemorative", "2024-05-20", null, circular, "Banco de México, Circular 7/2025. Put into circulation 20 May 2024, commemorating thirty years of the Bank's autonomy."),
  ...[5000, 10000, 20000, 50000, 100000].map((minor): Issue => row(
    minor,
    `${minor / 100} peso note, type G, bank centenary`,
    "2025-08-25",
    null,
    circular,
    "Banco de México, Circular 7/2025, 25 August 2025. These 50, 100, 200, 500 and 1,000 peso type G notes carry the legend 100 Aniversario 1925-2025. They circulate with the type G notes put into circulation from 27 August 2018. The period is transitory and the circular does not give the end.",
  )),
];
