exports.PRETTIER_CONFIG = {
  parser: 'babylon',
  singleQuote: true, // prefer 单引号
  trailingComma: 'es5', // 追加末尾逗号
};

exports.BABEL_CONFIG = {
  sourceType: 'module',
  plugins: ['*', 'exportDefaultFrom', 'typescript'],
};
