import type { CashSet } from "../types";

const checked = "2026-11-20";

export const jpy: CashSet = {
  code: "JPY",
  notes: [10000, 5000, 1000],
  coins: [500, 100, 50, 10, 5, 1],
  everyday: 10000,
  increment: 1,
  source: "https://www.boj.or.jp/en/note_tfjgs/note/valid/index.htm",
  checked,
};
