import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/", "site/", "node_modules/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["scripts/**/*.mjs", "demo/**/*.js", "tsup.config.ts", "vitest.config.ts"],
    languageOptions: {
      globals: {
        console: "readonly",
        process: "readonly",
        document: "readonly",
        window: "readonly",
        Element: "readonly",
        HTMLElement: "readonly",
        customElements: "readonly",
        URL: "readonly",
        Intl: "readonly",
      },
    },
  },
);
