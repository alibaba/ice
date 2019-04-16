const babel = require('@babel/core');
const getBabelConfig = require('../config/getBabelConfig');

module.exports = function (source) {
  const babelrc = getBabelRC();
  const { code } = babel.transform(source, Object.assign(babelrc, {
    // filename *.js pass to babel to avoid load @babel/preset-typescript plugin
    filename: 'source.js',
  }));
  return code;
};

function getBabelRC() {
  const babelConfig = getBabelConfig();
  return babelConfig;
}
