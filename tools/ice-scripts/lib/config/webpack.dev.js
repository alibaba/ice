const getBaseCofing = require('./webpack.base.js');

module.exports = () => {
  const baseConfig = getBaseCofing('development');
  baseConfig.devtool('cheap-module-source-map');

  return baseConfig;
};
