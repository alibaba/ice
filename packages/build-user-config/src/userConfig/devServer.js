module.exports = (config, devServer, context) => {
  const { userConfig } = context;
  // make sure to use config proxy instead of config devServer.proxy
  if (userConfig.proxy && devServer.proxy) {
    console.log('use config proxy instead of devServer.proxy');
    delete devServer.proxy;
  }

  // `allowedHosted` is regarded as ChainSet.
  // https://github.com/neutrinojs/webpack-chain/blob/da73fab944e5ba6e1e902a7e134709907c8bea50/src/DevServer.js#L8
  if (typeof devServer.allowedHosts === 'string') {
    devServer.allowedHosts = [devServer.allowedHosts];
  }
  // merge default devServer
  config.merge({ devServer });
};
