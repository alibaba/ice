const babel = require('babel-core');
const compileES5 = exports.compileES5 = function compileES5(source) {
  const babelrc = getBabelRC();
  const { code } = babel.transform(source, babelrc);
  return code;
};

const getBabelConfig = require('../config/getBabelConfig');
function getBabelRC() {
  return getBabelConfig();
}
