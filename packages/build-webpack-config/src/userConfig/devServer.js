const defaultConfig = require('../config/default.config');

module.exports = (config, devServer, context) => {
  const { userConfig } = context;
  // make sure to use config proxy instead of config devServer.proxy
  if (userConfig.proxy && devServer.proxy) {
    console.log('use config proxy instead of devServer.proxy');
    delete devServer.proxy;
  }
  // merge default devServer
  config.merge({ devServer: { ...defaultConfig.devServer, ...devServer } });
};
