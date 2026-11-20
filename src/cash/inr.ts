import type { CashSet } from "../types";

const checked = "2026-11-20";

export const inr: CashSet = {
  code: "INR",
  notes: [50000, 20000, 10000, 5000, 2000, 1000],
  coins: [2000, 1000, 500, 200, 100, 50],
  everyday: 50000,
  increment: 50,
  source: "https://www.rbi.org.in/commonman/english/scripts/FAQs.aspx?Id=3158",
  checked,
};

// The 2,000 rupee note is still legal tender and is not in this list.
// Banks were told to stop issuing it. The dated rows are in src/issueInr.ts.
