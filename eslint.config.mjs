import { defineConfig, globalIgnores } from "eslint/config";
import eslintPluginAstro from "eslint-plugin-astro";
import tseslint from "typescript-eslint";

const eslintConfig = defineConfig([
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    // Same severity eslint-config-next used.
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  globalIgnores([
    "dist/**",
    ".astro/**",
    ".vercel/**",
  ]),
]);

export default eslintConfig;
