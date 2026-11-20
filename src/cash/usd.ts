import type { CashSet } from "../types";

const checked = "2026-11-20";

export const usd: CashSet = {
  code: "USD",
  notes: [10000, 5000, 2000, 1000, 500, 100],
  coins: [25, 10, 5, 1],
  everyday: 10000,
  increment: 1,
  source: "https://www.uscurrency.gov/denominations",
  checked,
};
