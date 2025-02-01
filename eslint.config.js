import eslint from '@eslint/js';
import userscripts from 'eslint-plugin-userscripts';
import globals from 'globals';
import stylisticJs from '@stylistic/eslint-plugin-js';

/** @type{import('eslint').Linter.Config} */
export default [
  eslint.configs.recommended,
  {
    files: ["libraries/*.js", "eslint.config.js"],
    plugins: {
      '@stylistic/js': stylisticJs
    },
    languageOptions: {
      globals: {
        ...globals.browser
      }
    },
    rules: {
      "@stylistic/js/indent": ["warn", 2],
      "@stylistic/js/comma-spacing": [
        "error",
        {"before": false, "after": true}
      ],
      "@stylistic/js/key-spacing": ["warn"],
      "@stylistic/js/semi": [
        "error",
        "always",
        {"omitLastInOneLineBlock": true}
      ],
      "@stylistic/js/semi-spacing": [
        "error",
        {"before": false, "after": true }
      ],
      "@stylistic/js/semi-style": ["error", "last"],
    }
  },
  {
    files: ["**/*.user.js"],
    plugins: {
      userscripts: {
        rules: userscripts.rules,
      },
      '@stylistic/js': stylisticJs
    },
    rules: {
      ...userscripts.configs.recommended.rules,
      "no-redeclare": ["warn"],
      "no-unused-vars": [
        "warn",
        {"vars": "local", "args": "all"}
      ],
      "userscripts/require-download-url": 0,
      "userscripts/use-homepage-and-url": 0,
      "@stylistic/js/indent": ["warn", 4],
      "@stylistic/js/array-bracket-newline": [
        "warn",
        {"multiline": true, "minItems": 4}
      ],
      "@stylistic/js/array-bracket-spacing": [
        "warn",
        "always",
        {"singleValue": false}
      ],
      "@stylistic/js/brace-style": [
        "warn",
        "1tbs",
        {"allowSingleLine": true}
      ],
      "camelcase": [
        "warn",
        {"properties": "always", "ignoreGlobals": true}
      ],
      "@stylistic/js/comma-spacing": [
        "warn",
        {"before": false, "after": true}
      ],
      "@stylistic/js/computed-property-spacing": [
        "warn",
        "never"
      ],
      "@stylistic/js/key-spacing": ["warn"],
      "@stylistic/js/linebreak-style": [
        "error",
        "unix"
      ],
      "@stylistic/js/no-whitespace-before-property": ["error"],
      "@stylistic/js/semi": [
        "error",
        "always",
        {"omitLastInOneLineBlock": true}
      ],
      "@stylistic/js/semi-spacing": [
        "error",
        {"before": false, "after": true }
      ],
      "@stylistic/js/semi-style": ["error", "last"],
      "@stylistic/js/space-infix-ops": ["error"],
      "@stylistic/js/space-unary-ops": [
        "warn",
        {
          "nonwords": true, 
          "overrides": {
            "!": false,
            "!!": false,
            "^=": false,
            "*=": false,
            "!=": false
          }
        }
      ],
      "@stylistic/js/switch-colon-spacing": [
        "warn",
        {"after": true, "before": false}
      ]
      
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
