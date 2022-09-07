const { getESLintConfig } = require('@applint/spec');

const commonRules = {
  'react/jsx-filename-extension': 0,
  'no-underscore-dangle': 0,
  'class-methods-use-this': 0,
  'no-param-reassign': 0,
  'no-console': 0,
  'comma-dangle': 0,
  'prefer-object-spread': 0,
  'import/named': 0,
  indent: 0,
  'react/react-in-jsx-scope': 0,
  'jsx-a11y/html-has-lang': 0,
  'react/static-property-placement': 0,
  'no-multiple-empty-lines': 1,
  'react/jsx-no-bind': 0,
  'import/order': 1,
  'no-multi-assign': 0,
};

module.exports = getESLintConfig('react-ts', {
  rules: {
    ...commonRules,
    '@typescript-eslint/ban-types': 0,
    '@typescript-eslint/ban-ts-comment': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/prefer-for-of': 0,
    'id-length': 0,
    'no-use-before-define': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': ['warn', {
      varsIgnorePattern: '[iI]gnored|createElement',
    }],
    '@typescript-eslint/ban-ts-ignore': 0,
    '@typescript-eslint/no-confusing-void-expression': 0,
    '@typescript-eslint/promise-function-async': 0,
    '@typescript-eslint/no-unnecessary-type-assertion': 0,
    '@typescript-eslint/non-nullable-type-assertion-style': 0,
    '@typescript-eslint/no-unnecessary-type-arguments': 0,
    '@typescript-eslint/await-thenable': 0,
    '@typescript-eslint/prefer-nullish-coalescing': 0,
    '@typescript-eslint/consistent-type-imports': 2,
  },
  parserOptions: {
    project: [],
    createDefaultProgram: false,
  },
});