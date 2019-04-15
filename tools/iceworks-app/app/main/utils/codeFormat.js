const prettier = require('prettier');
const config = require('../config');

module.exports = function codeFormat(str, opts) {
  return prettier.format(str, Object.assign({}, config.prettier, opts));
};
