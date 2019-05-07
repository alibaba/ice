module.exports = (api) => {
  const { userConfig } = api;
  api.chainWebpackConfig((config) => {
    if (userConfig.publicPath) {
      config.output.publicPath(userConfig.publicPath);
    }
  });
};
