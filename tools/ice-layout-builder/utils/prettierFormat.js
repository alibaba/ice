const prettier = require('prettier');

const config = {
  singleQuote: true,
  arrowParens: 'always',
  trailingComma: 'es5',
};

module.exports = function prettierFormat(str, opts) {
  return prettier.format(str, Object.assign({}, config, opts));
};
