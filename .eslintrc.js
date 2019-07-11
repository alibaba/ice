const { eslintTS, deepmerge } = require('@ice/spec');

module.exports = deepmerge(eslintTS, {
  rules: {
    // 禁止用var引入模块：取消
    "@typescript-eslint/no-var-requires": 0
  }
});
