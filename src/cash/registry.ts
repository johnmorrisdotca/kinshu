import { cad } from "./cad";
import { cny } from "./cny";
import { eur } from "./eur";
import { gbp } from "./gbp";
import { jpy } from "./jpy";
import { krw } from "./krw";
import { thb } from "./thb";
import { usd } from "./usd";
import type { CashSet } from "../types";

/** The cash files checked by hand. Every other currency has identity and tender places, and no pieces yet. */
export const CASH: Readonly<Record<string, CashSet>> = {
  CAD: cad,
  USD: usd,
  JPY: jpy,
  GBP: gbp,
  EUR: eur,
  THB: thb,
  KRW: krw,
  CNY: cny,
};
