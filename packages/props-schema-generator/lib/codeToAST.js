const babylon = require('babylon');

const conf = {
  sourceType: 'module',
  plugins: [
    'jsx',
    'flow',
    'asyncFunctions',
    'classConstructorCall',
    'doExpressions',
    'trailingFunctionCommas',
    'objectRestSpread',
    'decorators',
    'classProperties',
    'exportExtensions',
    'exponentiationOperator',
    'asyncGenerators',
    'functionBind',
    'functionSent',
  ],
};

module.exports = function(code) {
  code = code.toString();
  return babylon.parse(code, conf);
};
