import type { CashSet } from "../types";

const checked = "2026-11-20";

export const cny: CashSet = {
  code: "CNY",
  notes: [10000, 5000, 2000, 1000, 500, 100],
  coins: [50, 10],
  everyday: 10000,
  increment: 1,
  source: "http://www.pbc.gov.cn/en/3688110/3688172/index.html",
  checked,
};
