const { eslint, tslint, deepmerge } = require('@ice/spec');

const commonRules = {
  "react/jsx-filename-extension": 0,
  "no-underscore-dangle": 0,
  "class-methods-use-this": 0,
  "no-param-reassign": 0,
  "comma-dangle": 0,
  "prefer-object-spread": 0,
  "import/named": 0,
  // TODO: open rule indent, consider of  MemberExpression
  "indent": 0,
  "semi": 2,
  "react/react-in-jsx-scope": 0,
  "jsx-a11y/html-has-lang": 0,
  "react/static-property-placement": 0
};

const jsRules = deepmerge(eslint, {
  rules: {
    ...commonRules,
  },
});

const tsRules = deepmerge(tslint, {
  rules: {
    ...commonRules,
    "@typescript-eslint/ban-ts-ignore": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/explicit-function-return-type": 0,
  },
});

delete tsRules.root;

module.exports = {
  ...jsRules,
  overrides: [
    {
      ...tsRules,
      files: ['**/*.ts', '**/*.tsx'],
    },
  ],
  env: {
    "jest": true
  }
};
