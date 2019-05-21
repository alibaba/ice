module.exports = (api, vendor) => {
  api.chainWebpack((config) => {
    if (!vendor) {
      config.optimization.splitChunks({ cacheGroups: {} });
    } else {
      config.optimization.splitChunks({ cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
          minChunks: 2,
        },
      } });
    }
  });
};
