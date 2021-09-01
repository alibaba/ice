const { BundleAnalyzerPlugin } = require('@builder/pack/deps/webpack-bundle-analyzer');

module.exports = (config, analyzer) => {
  if (analyzer) {
    config.plugin('webpack-bundle-analyzer')
      .use(BundleAnalyzerPlugin, [{ analyzerPort: '9000' }]);
  }
};
