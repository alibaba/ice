const babel = require('@babel/core');

module.exports = function (source, babelConfig) {
  const { code } = babel.transform(source, Object.assign(babelConfig, {
    // filename *.js pass to babel to avoid load @babel/preset-typescript plugin
    filename: 'source.js',
  }));
  return code;
};
