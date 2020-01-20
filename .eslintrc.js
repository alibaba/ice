const { tslint, deepmerge } = require('@ice/spec');

module.exports = deepmerge(tslint, {
  rules: {
    "@typescript-eslint/no-var-requires": 0,
    "class-methods-use-this": 1,
  },
  env: {
    jest: true,
  },
});
