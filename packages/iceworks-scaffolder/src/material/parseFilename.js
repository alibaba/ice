/**
 * 转换模块名
 *
 * @example
 * [name].js => hello.js
 */
const get = require('lodash.get');

module.exports = function parseFilename(input, data) {
  return input.replace(/\[([\.a-z0-9]+)\]/gi, (str, key) => {
    return get(data, key, `[${key}]`);
  });
};
