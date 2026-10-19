import tsParser from "@typescript-eslint/parser";
import importsPlugin from "eslint-plugin-import-x";

export default [
  { ignores: ["node_modules/**", "dist/**", ".astro/**", "src/data/**"] },
  {
    // Apply to all files
    files: ["**/*.ts", "**/*.tsx", "**/*.mjs"],
    ignores: [
      "node_modules/**/*",
      "dist/**/*",
      "**/src/components/ui/**",
      "**/components/ui/**",
    ],
    plugins: {
      "import-x": importsPlugin,
    },
    rules: {
      "import-x/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            ["internal", "parent", "sibling", "index"],
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "builtin",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
  {
    // Apply to TypeScript files
    files: ["**/*.ts", "**/*.tsx", "**/*.mjs"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        sourceType: "module",
      },
    },
  },
];
