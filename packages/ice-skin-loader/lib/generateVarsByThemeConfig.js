const kebab = require('kebab-case');
const primaryColor = require('./primaryColor');
const secondaryColor = require('./secondaryColor');

module.exports = function generateVarsByThemeConfig(themeConfig) {
  const themeVars = Object.assign({}, themeConfig);

  // 非 sass 变量
  delete themeVars.nextPrefix;
  delete themeVars.theme;

  const appendVariables = Object.keys(themeVars)
    .map((key) => {
      const value = themeVars[key];
      return getVariableMappingString(key, value);
    });

  return appendVariables.join('\n');
};

/**
 * 获取 sass 变量字符串映射
 * @param {String} key 用户输入的 key
 * @param {String} value 用户输入的 value
 * @return {String} scss stynax string
 */
function getVariableMappingString(key, value) {
  // 输入是小驼峰, scss 变量需要的是 kebab-case
  key = kebab(key).replace(/^\-/, '');

  switch (key) {
    case 'primary-color':
      // 根据用户配置动态计算主品牌色相关的多个变量
      return primaryColor(value);
    case 'secondary-color':
      // 根据用户配置动态计算次品牌色相关的多个变量
      return secondaryColor(value);
    case 'icon-font-path':
    case 'icon-font-name':
    case 'font-custom-path':
      // 根据用户配置覆盖变量
      return `$${key}: ${JSON.stringify(value)};`;
    default:
      if (/icon\-content\-/.test(key)) {
        return `$${key}: ${JSON.stringify(value)};`;
      }
      return `$${key}: ${value};`;
  }
}
