const { eslint, tslint, deepmerge } = require('@ice/spec');

const commonRules = {
  "react/jsx-filename-extension": 0,
  "no-underscore-dangle": 0,
  "class-methods-use-this": 0,
  "no-param-reassign": 0,
  "comma-dangle": 0
};

const jsRules = deepmerge(eslint, {
  rules: {
    ...commonRules,
  },
});

const tsRules = deepmerge(tslint, {
  rules: {
    ...commonRules,
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
};
