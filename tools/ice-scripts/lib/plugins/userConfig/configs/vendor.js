module.exports = (api, vendor) => {
  // default is true
  if (!vendor) {
    api.chainWebpack((config) => {
      config.optimization.splitChunks({ cacheGroups: {} });
    });
  }
};
