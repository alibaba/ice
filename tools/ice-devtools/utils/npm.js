const kebabCase = require('kebab-case');

/**
 * 获取 npm 包名
 * @param {string} name
 */
function generateNpmNameByPrefix(name, npmPrefix) {
  return npmPrefix + kebabCase(name).replace(/^-/, '');
}

module.exports = {
  generateNpmNameByPrefix,
};
