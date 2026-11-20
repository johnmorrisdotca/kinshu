import type { CashSet } from "../types";

const checked = "2026-11-20";

export const gbp: CashSet = {
  code: "GBP",
  notes: [5000, 2000, 1000, 500],
  coins: [200, 100, 50, 20, 10, 5, 2, 1],
  everyday: 10000,
  increment: 1,
  source: "https://www.bankofengland.co.uk/banknotes",
  checked,
};
