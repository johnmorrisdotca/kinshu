import type { CashSet } from "../types";

const checked = "2026-11-20";

export const krw: CashSet = {
  code: "KRW",
  notes: [50000, 10000, 5000, 1000],
  coins: [500, 100, 50, 10],
  everyday: 100000,
  increment: 1,
  source: "https://www.bok.or.kr/eng/main/contents.do?menuNo=400117",
  checked,
};
