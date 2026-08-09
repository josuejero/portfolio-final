import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextCoreWebVitals,
  ...nextTypeScript,

  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],

      /*
       * Temporary Next 16 / React lint migration compatibility.
       *
       * Existing behavior is intentionally preserved during the
       * framework migration. These should be re-enabled after the
       * affected components are deliberately refactored.
       */
      "react-hooks/immutability": "off",
      "react-hooks/set-state-in-effect": "off",
    },
  },

  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "dist/**",
    "next-env.d.ts",
  ]),
]);
