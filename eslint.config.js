import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config} */
export default {
  // Global language options
  languageOptions: {
    globals: globals.browser, // Browser-specific globals
    sourceType: 'commonjs', // CommonJS modules
  },
  // Extend recommended configs
  extends: [
    'airbnb',
    'prettier', // Integrates Prettier rules
    'plugin:node/recommended', // Node.js best practices
    pluginJs.configs.recommended, // JS-specific recommended rules
  ],
  plugins: ['prettier'], // Prettier as a plugin
  // Custom rules
  rules: {
    'prettier/prettier': 'error', // Enforce Prettier formatting
    'spaced-comment': 'off', // Allow comments without spacing
    'no-console': 'warn', // Warn when using console.log
    'consistent-return': 'off', // Disable consistent return requirement
    'func-names': 'off', // Allow unnamed functions
    'object-shorthand': 'off', // Allow non-shorthand object properties
    'no-process-exit': 'off', // Allow `process.exit()`
    'no-param-reassign': 'off', // Allow parameter reassignment
    'no-return-await': 'off', // Allow `return await`
    'no-underscore-dangle': 'off', // Allow dangling underscores
    'class-methods-use-this': 'off', // Allow methods without `this`
    'prefer-destructuring': ['error', { object: true, array: false }], // Enforce destructuring for objects
    'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next|val' }], // Ignore specific unused variables
  },
};
