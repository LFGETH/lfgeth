import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: [".next/**", "node_modules/**", "contracts/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  // CommonJS config files need node globals
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        module: "writable",
        require: "readonly",
        exports: "writable",
        __dirname: "readonly",
        __filename: "readonly",
        process: "readonly",
      },
    },
  },
];
