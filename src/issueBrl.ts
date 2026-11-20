import type { Issue } from "./types";

const checked = "2026-11-20";
const produced = "https://www.bcb.gov.br/cedulasemoedas/cedulasemitidas";
const report =
  "https://www.bcb.gov.br/Pre/Surel/RelAdmBC/2013/o-banco-central-do-brasil-e-a-sociedade/cidadania-e-sistema-financeiro/dinheiro-em-circulacao.html";

const first =
  "Banco Central do Brasil, cédulas produzidas, read 20 November 2026. The first family of the real was launched on 1 July 1994. The page dates the family, not each denomination, and does not say these notes stopped being legal tender. A 10 real Pedro Álvares Cabral note on the same page is printed MODELO and has no circulation value, so it is not listed.";

function note(
  minor: number,
  name: string,
  from: string | null,
  asOf: string | null,
  source: string,
  text: string,
): Issue {
  return {
    code: "BRL",
    kind: "note",
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
    note: text,
  };
}

const second =
  "Banco Central do Brasil, Relatório da Administração 2013. The second family began in 2010 with the 50 and 100 real notes, continued in 2012 with the 10 and 20, and the 2 and 5 were launched in 2013. The report gives the year, not the day.";

export const BRL_ISSUES: Issue[] = [
  note(100, "1 real note, first family", "1994-07-01", null, produced, first),
  note(200, "2 real note, first family", "1994-07-01", null, produced, first),
  note(500, "5 real note, first family", "1994-07-01", null, produced, first),
  note(1000, "10 real note, first family", "1994-07-01", null, produced, first),
  note(2000, "20 real note, first family", "1994-07-01", null, produced, first),
  note(5000, "50 real note, first family", "1994-07-01", null, produced, first),
  note(10000, "100 real note, first family", "1994-07-01", null, produced, first),
  note(5000, "50 real note, second family", "2010", null, report, second),
  note(10000, "100 real note, second family", "2010", null, report, second),
  note(1000, "10 real note, second family", "2012", null, report, second),
  note(2000, "20 real note, second family", "2012", null, report, second),
  note(200, "2 real note, second family", "2013", null, report, second),
  note(500, "5 real note, second family", "2013", null, report, second),
  note(20000, "200 real note, second family", null, checked, produced, "Banco Central do Brasil, cédulas produzidas, read 20 November 2026. The second family list includes a 200 real note. The page does not give its date, so a year before 2026 stays unlisted."),
];
