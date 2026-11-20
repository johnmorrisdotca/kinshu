import type { CashSet } from "../types";

const checked = "2026-11-20";

export const cad: CashSet = {
  code: "CAD",
  notes: [10000, 5000, 2000, 1000, 500],
  coins: [200, 100, 25, 10, 5],
  everyday: 10000,
  increment: 5,
  source: "https://www.bankofcanada.ca/banknotes/",
  checked,
};

// The 1 and 2 dollar notes, and the other retired denominations, are in
// src/issueFacts.ts. This list is only what is handed out as change.
