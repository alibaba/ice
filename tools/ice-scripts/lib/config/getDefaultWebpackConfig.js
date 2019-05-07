const getWebpackConfigDev = require('./webpack.config.dev');
const getWebpackConfigProd = require('./webpack.config.prod');

module.exports = function getDefaultWebpackConfig() {
  // TODO get default webpack config with webpack-chain ?
  return process.env.NODE_ENV === 'production'
    ? getWebpackConfigProd({ buildConfig: {} })
    : getWebpackConfigDev({ buildConfig: {} });
};
