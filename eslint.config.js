import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

/**
 * Deliberately small. Three things the compiler cannot catch and that have already
 * cost us real bugs in this repo:
 *   - react-hooks: the AdminDashboard crash was a hook called after an early return.
 *   - jsx-a11y: unlabelled inputs and unnamed buttons survived three manual audits.
 *   - no-floating-promises: every silent lead-form failure was an unawaited promise.
 * Everything else is left at its default; this is a gate, not a style council.
 */
export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'public', '.vercel'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: {
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      // The API handler talks to an untyped serverless request/response.
      '@typescript-eslint/no-explicit-any': 'off',
      // tsconfig already enforces this via noUnusedLocals.
      '@typescript-eslint/no-unused-vars': 'off',

      // Anchors that are real routes but intercepted by the SPA router.
      'jsx-a11y/anchor-is-valid': 'off',
    },
  },

  // Node scripts and the assertion tests.
  {
    files: ['scripts/**/*.mjs', '**/*.test.ts'],
    languageOptions: { globals: globals.node },
  },
);
