import globals from 'globals';
import pluginJs from '@eslint/js';

/** @type {import('eslint').Linter.Config} */
export default {
  env: {
    node: true, // Node.js global variables and Node.js scoping.
    es2021: true, // Enable ES2021 features.
  },
  languageOptions: {
    globals: globals.node, // Use Node.js-specific globals
    sourceType: 'module', // Use 'module' if using ES6 modules, 'commonjs' for CommonJS
  },
  extends: [
    'airbnb-base', // Base Airbnb rules (without React)
    'prettier', // Integrates Prettier rules
    'plugin:node/recommended', // Node.js best practices
    pluginJs.configs.recommended, // JS-specific recommended rules
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error', // Enforce Prettier formatting
    'spaced-comment': 'off', // Allow comments without spacing
    'no-console': 'warn', // Warn on console logs (common in backend for debugging)
    'consistent-return': 'off', // Disable consistent return requirement
    'func-names': 'off', // Allow unnamed functions
    'object-shorthand': 'off', // Allow non-shorthand object properties
    'no-process-exit': 'off', // Allow `process.exit()`
    'no-param-reassign': 'off', // Allow parameter reassignment (common in Express middleware)
    'no-return-await': 'off', // Allow `return await`
    'no-underscore-dangle': 'off', // Allow leading/trailing underscores in identifiers
    'class-methods-use-this': 'off', // Allow class methods without `this`
    'prefer-destructuring': ['error', { object: true, array: false }], // Enforce object destructuring
    'no-unused-vars': ['error', { argsIgnorePattern: 'req|res|next' }], // Ignore unused Express arguments
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] }, // Allows ES Modules (import/export)
    ],
  },
};
