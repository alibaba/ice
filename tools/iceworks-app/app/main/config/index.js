const locale = require('./locale');

module.exports = {
  locale,
  prettier: {
    singleQuote: true, // prefer 单引号
    trailingComma: 'es5', // 追加末尾逗号
  },
  routesTagPrefix: '',
  routesTagSuffix: '',
  navsTagPrefix: '',
  navsTagSuffix: '',
};
