module.exports = (api, devServer) => {
  const { userConfig } = api.service;
  api.chainWepack((config) => {
    // make sure to use config proxy instead of config devServer.proxy
    if (userConfig.proxy && devServer.proxy) {
      delete devServer.proxy;
    }
    config.merge({ devServer });
  });
};
