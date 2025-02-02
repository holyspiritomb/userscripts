import eslint from '@eslint/js';
import userscripts from 'eslint-plugin-userscripts';
import globals from 'globals';
import stylisticJs from '@stylistic/eslint-plugin-js';
// import { rules, packages } from '@eslint-stylistic/metadata';
//
// console.log(rules);

/** @type{import('eslint').Linter.Config} */
export default [
  eslint.configs.recommended,
  {
    files: ["libraries/*.js", "eslint.config.js"],
    plugins: {
      '@stylistic/js': stylisticJs,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      "@stylistic/js/comma-dangle": ["warn", "always-multiline"],
      "@stylistic/js/comma-spacing": ["error", {"before": false, "after": true}],
      "@stylistic/js/indent": ["warn", 2],
      "@stylistic/js/key-spacing": ["warn"],
      "@stylistic/js/semi": ["error", "always", {"omitLastInOneLineBlock": true}],
      "@stylistic/js/semi-spacing": ["error", {"before": false, "after": true }],
      "@stylistic/js/semi-style": ["error", "last"],
    },
  },
  {
    files: ["**/*.user.js"],
    plugins: {
      userscripts: {
        rules: userscripts.rules,
      },
      '@stylistic/js': stylisticJs,
    },
    rules: {
      ...userscripts.configs.recommended.rules,
      "camelcase": ["warn", {"properties": "always", "ignoreGlobals": true}],
      "no-redeclare": ["warn"],
      "no-unused-vars": ["warn", {"vars": "local", "args": "all"}],
      "@stylistic/js/array-bracket-newline": ["warn", {"multiline": true, "minItems": 4}],
      "@stylistic/js/array-bracket-spacing": ["warn", "always", {"singleValue": false}],
      "@stylistic/js/brace-style": ["warn", "1tbs", {"allowSingleLine": true}],
      "@stylistic/js/comma-dangle": ["warn", "always-multiline"],
      "@stylistic/js/comma-spacing": ["warn", {"before": false, "after": true}],
      "@stylistic/js/computed-property-spacing": ["warn", "never"],
      "@stylistic/js/eol-last": ["warn", "always"],
      "@stylistic/js/indent": ["warn", 4],
      "@stylistic/js/key-spacing": ["warn"],
      "@stylistic/js/linebreak-style": ["error", "unix"],
      "@stylistic/js/no-tabs": ["error"],
      "@stylistic/js/no-trailing-spaces": ["error"],
      "@stylistic/js/no-whitespace-before-property": ["error"],
      "@stylistic/js/semi": ["error", "always", {"omitLastInOneLineBlock": true}],
      "@stylistic/js/semi-spacing": ["error", {"before": false, "after": true }],
      "@stylistic/js/semi-style": ["error", "last"],
      "@stylistic/js/space-infix-ops": ["error"],
      "@stylistic/js/switch-colon-spacing": ["warn", {"after": true, "before": false}],
      "userscripts/require-download-url": 1,
      "userscripts/use-homepage-and-url": 1,
      "userscripts/compat-grant": ["error", {"requireAllCompatible": false, "gmPolyfill": false}],
      "userscripts/compat-headers": ["error", {"requireAllCompatible": false}],
      "@stylistic/js/space-unary-ops": [
        "warn",
        {
          "nonwords": true, 
          "overrides": {
            "!": false,
            "!!": false,
            "^=": false,
            "*=": false,
            "!=": false,
          },
        },
      ],
      
    },
    languageOptions: {
      globals: {
        ...globals.greasemonkey,
        ...globals.browser,
        ...globals.jquery,
      },
    },
    settings: {
      userscriptVersions: {
        adguard: '*',
        violentmonkey: "*",
      },
    },
  },
];
