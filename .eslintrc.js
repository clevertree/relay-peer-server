module.exports = {
  root: true,
  extends: ['next', 'next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    // Disallow the use of `any`
    '@typescript-eslint/no-explicit-any': 'error',
    // Prefer explicit function return types
    '@typescript-eslint/explicit-module-boundary-types': ['warn'],
    // Disallow unused variables
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
  },
};
