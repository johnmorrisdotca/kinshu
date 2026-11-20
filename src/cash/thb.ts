import type { CashSet } from "../types";

const checked = "2026-11-20";

export const thb: CashSet = {
  code: "THB",
  notes: [100000, 50000, 10000, 5000, 2000],
  coins: [1000, 500, 200, 100],
  everyday: 100000,
  increment: 100,
  source: "https://www.bot.or.th/en/our-roles/banknotes.html",
  checked,
};
