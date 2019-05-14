const getWebpackConfigDev = require('./webpack.dev');
const getWebpackConfigProd = require('./webpack.prod');

module.exports = function getDefaultWebpackConfig() {
  return process.env.NODE_ENV === 'production'
    ? getWebpackConfigProd()
    : getWebpackConfigDev();
};
