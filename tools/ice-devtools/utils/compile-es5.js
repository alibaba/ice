const babel = require('@babel/core');
const getBabelConfig = require('../config/getBabelConfig');

module.exports = function (source) {
  const babelrc = getBabelRC();
  const { code } = babel.transform(source, babelrc);
  return code;
};

function getBabelRC() {
  const babelConfig = getBabelConfig();
  return babelConfig;
}