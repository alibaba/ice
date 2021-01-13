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
  switch (key) {
    case 'primaryColor':
      // 根据用户配置动态计算主品牌色相关的多个变量
      return primaryColor(value);
    case 'secondaryColor':
      // 根据用户配置动态计算次品牌色相关的多个变量
      return secondaryColor(value);
    default:
      // 自定义变量
      return `$${key}: ${value};`;
  }
}
