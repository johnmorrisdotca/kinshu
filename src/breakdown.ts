import type { CountedPiece, Piece } from "./types";

/**
 * Counts pieces that sum to a minor-unit amount, largest first. The piece list is the caller's:
 * a till passes its own drawer. Pieces that are not needed are left out. Any remainder smaller
 * than the smallest piece is not a piece.
 */
export function breakdown(minor: number, pieces: readonly Piece[]): CountedPiece[] {
  if (!Number.isInteger(minor)) throw new RangeError("minor must be an integer");
  let left = Math.abs(minor);
  const ordered = [...pieces].sort((a, b) => b.minor - a.minor);
  const counts: CountedPiece[] = [];
  for (const piece of ordered) {
    if (!Number.isInteger(piece.minor) || piece.minor < 1) throw new RangeError("a piece must be a positive integer of minor units");
    const count = Math.floor(left / piece.minor);
    if (count === 0) continue;
    counts.push({ minor: piece.minor, kind: piece.kind, count });
    left -= count * piece.minor;
  }
  return counts;
}
