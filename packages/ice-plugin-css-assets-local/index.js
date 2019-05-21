const ExtractCssAssetsWebpackPlugin = require('extract-css-assets-webpack-plugin');

module.exports = (api, options) => {
  const { service: { command }, log } = api;

  // it is increase dev build time
  if (command === 'build') {
    log.info('离线化构建项目，自动下载网络资源，请耐心等待');

    api.chainWebpack((config) => {
      // TODO: set publicPath
      config.plugin('ExtractCssAssetsWebpackPlugin')
        .use(ExtractCssAssetsWebpackPlugin, [{
          outputPath: options.outputPath || 'assets',
          relativeCssPath: options.relativeCssPath || '../',
        }]);
    });
  }
};
