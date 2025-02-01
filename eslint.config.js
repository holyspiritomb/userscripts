import eslint from '@eslint/js';
import userscripts from 'eslint-plugin-userscripts';
import globals from 'globals';

/** @type{import('eslint').Linter.Config} */
export default [
  eslint.configs.recommended,
  {
    files: ["**/*.user.js"],
    plugins: {
      userscripts: {
        rules: userscripts.rules,
      }
    },
    rules: {
      ...userscripts.configs.recommended.rules,
      "userscripts/require-download-url": 0,
      "userscripts/use-homepage-and-url": 0,
      "userscripts/align-attributes": 0
    },
    languageOptions: {
      globals: {
        ...globals.greasemonkey,
        ...globals.browser,
        ...globals.jquery
      }
    },
    settings: {
      userscriptVersions: {
        violentmonkey: "*",
      }
    }
  },
];
