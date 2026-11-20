// Integer money. A dime is 10 and a yen is 1. Callers pass an exponent, never a currency code,
// so a till can use this with no dataset.

const MAX_EXPONENT = 6;

function assertExponent(exponent: number): void {
  if (!Number.isInteger(exponent) || exponent < 0 || exponent > MAX_EXPONENT) {
    throw new RangeError(`exponent must be an integer from 0 to ${MAX_EXPONENT}`);
  }
}

function assertFinite(amount: number): void {
  if (!Number.isFinite(amount)) throw new RangeError("amount must be finite");
}

/** The minor-unit integer for an amount. 1.85 dollars is 185. */
export function toMinor(amount: number, exponent: number): number {
  assertFinite(amount);
  assertExponent(exponent);
  return Math.round(amount * 10 ** exponent);
}

/** The major-unit amount for a minor-unit integer. */
export function fromMinor(minor: number, exponent: number): number {
  assertFinite(minor);
  assertExponent(exponent);
  return minor / 10 ** exponent;
}

/**
 * Rounds a minor-unit integer to the nearest cash step. Canada's step is 5, so 2 rounds
 * down to 0 and 3 rounds up to 5. A step of 1 leaves the amount as it is.
 */
export function cashRound(minor: number, increment: number): number {
  if (!Number.isInteger(minor)) throw new RangeError("minor must be an integer");
  if (!Number.isInteger(increment) || increment < 1) throw new RangeError("increment must be a positive integer");
  if (increment === 1) return minor;
  const sign = minor < 0 ? -1 : 1;
  const absolute = Math.abs(minor);
  const remainder = absolute % increment;
  const towardZero = absolute - remainder;
  const rounded = remainder * 2 >= increment ? towardZero + increment : towardZero;
  return sign * rounded;
}
