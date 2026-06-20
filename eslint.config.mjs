import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  files: ['**/*.ts', '**/*.tsx'],
  languageOptions: {
    parserOptions: {
      project: ['./tsconfig.app.json', './tsconfig.node.json'], // Type-aware linting
      tsconfigRootDir: import.meta.dirname,
    },
  },
  extends: [
    eslint.configs.recommended,             // Base JS rules
    ...tseslint.configs.recommended,        // Basic TS rules
    ...tseslint.configs.recommendedTypeChecked, // Type-aware TS rules
  ],
  rules: {
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/no-duplicate-type-constituents': 'error'
    // Add more rules as needed
  },
});
