import type { CashSet } from "../types";

const checked = "2026-11-20";

export const brl: CashSet = {
  code: "BRL",
  notes: [20000, 10000, 5000, 2000, 1000, 500, 200],
  coins: [100, 50, 25, 10, 5, 1],
  everyday: 20000,
  increment: 1,
  source: "https://www.bcb.gov.br/cedulasemoedas/cedulasemitidas",
  checked,
};

// Notes are the second family on the produced-notes page. Coins are the
// second family on https://www.bcb.gov.br/cedulasemoedas/moedasemitidas,
// read the same day. The first-family 1 real coin left circulation on
// 23 December 2003 and is not in this list.
