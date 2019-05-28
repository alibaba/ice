const getWebpackConfigDev = require('./webpack.dev');
const getWebpackConfigBuild = require('./webpack.build');

module.exports = function getDefaultWebpackConfig(command) {
  // 根据 command 返回对应的 webpack config
  switch (command) {
    case 'build':
      return getWebpackConfigBuild();
    case 'dev':
      return getWebpackConfigDev();
    default:
      return getWebpackConfigDev();
  }
};
