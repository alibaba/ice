const path = require('path');
const fs = require('fs');
const _kebab = require('kebab-case');
const primaryColor = require('./primaryColor');
const secondaryColor = require('./secondaryColor');

function kebab(str) {
  return _kebab(str).replace(/^\-/, '');
}

/**
 * Get Curren Work Directory's package.json
 */
function getPackageContent() {
  const cwd = process.cwd();
  return require(path.join(cwd, 'package.json'));
}

/**
 * 获取 sass 变量字符串映射
 * @param {String} key 用户输入的 key
 * @param {String} value 用户输入的 value
 * @return {String} scss stynax string
 */
function getVariableMappingString(key, value) {
  // 输入是小驼峰, scss 变量需要的是 kebab-case
  key = kebab(key);

  switch (key) {
    case 'primary-color':
      return primaryColor(value);
    case 'secondary-color':
      return secondaryColor(value);
    default:
      return `$${key}: ${value};`;
  }
}

/**
 * Get scss variables string for skin
 */
function createSkinExtraContent() {
  try {
    const pkg = getPackageContent();
    const themeConfig = Object.assign({}, pkg.themeConfig);
    delete themeConfig.theme; // no need of theme

    const appendVariables = Object.keys(themeConfig)
      .map((key) => {
        const value = themeConfig[key];
        return getVariableMappingString(key, value);
      })
      .join('\n');
    return appendVariables;
  } catch (err) {
    console.log(err);
    return '';
  }
}

module.exports = createSkinExtraContent;
