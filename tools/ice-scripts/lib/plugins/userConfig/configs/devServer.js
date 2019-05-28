module.exports = ({ context, chainWebpack }, devServer) => {
  const { userConfig } = context;
  chainWebpack((config) => {
    // make sure to use config proxy instead of config devServer.proxy
    if (userConfig.proxy && devServer.proxy) {
      delete devServer.proxy;
    }
    config.merge({ devServer });
  });
};
