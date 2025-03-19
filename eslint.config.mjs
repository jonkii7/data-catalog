import typescriptEslintPlugin from '@typescript-eslint/eslint-plugin';
import prettierPlugin from 'eslint-plugin-prettier';
import * as typescriptEslintParser from '@typescript-eslint/parser';

export default [
    {
        files: ['**/*.ts', '**/*.tsx'],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: 'module',
            parser: typescriptEslintParser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
        plugins: {
            '@typescript-eslint': typescriptEslintPlugin,
            prettier: prettierPlugin,
        },
        rules: {
            "@typescript-eslint/explicit-function-return-type": "error", 
            "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_" }],
            "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-inferrable-types": "error",
            '@typescript-eslint/explicit-module-boundary-types': 'warn',
            "indent": ["error", "tab"],
            "quotes": ["error", "double",{ "avoidEscape": true, "allowTemplateLiterals": true }],
            "semi": ["error", "always"],
            "no-eval": "error",
            "no-var": "error",
            "prefer-const": "error",
            "@typescript-eslint/ban-ts-comment": "warn",
          },
    },
];
