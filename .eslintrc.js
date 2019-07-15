const { eslintTS, deepmerge } = require('@ice/spec');

module.exports = deepmerge(eslintTS, {
  rules: {
    "@typescript-eslint/no-var-requires": 0,
    "class-methods-use-this": 1,
  }
});
