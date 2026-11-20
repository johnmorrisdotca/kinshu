import { defineConfig } from "tsup";

const shared = {
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: false,
  minify: false,
  target: "es2022",
  outDir: "dist",
};

export default defineConfig({
  ...shared,
  entry: {
    index: "src/index.ts",
    minor: "src/minor.ts",
    parts: "src/parts.ts",
    breakdown: "src/breakdown.ts",
    currency: "src/currency.ts",
    places: "src/places.ts",
    bitcoin: "src/bitcoin.ts",
    history: "src/history.ts",
    "cash/cad": "src/cash/cad.ts",
    "cash/usd": "src/cash/usd.ts",
    "cash/jpy": "src/cash/jpy.ts",
    "cash/gbp": "src/cash/gbp.ts",
    "cash/eur": "src/cash/eur.ts",
    "cash/thb": "src/cash/thb.ts",
    "cash/krw": "src/cash/krw.ts",
    "cash/cny": "src/cash/cny.ts",
    "cash/inr": "src/cash/inr.ts",
  },
  esbuildOptions(options) {
    options.charset = "utf8";
  },
});
