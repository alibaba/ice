const ExtractCssAssetsWebpackPlugin = require('extract-css-assets-webpack-plugin');

module.exports = ({ context, log, onGetWebpackConfig }, options = {}) => {
  const { command } = context;
  const { outputPath, relativeCssPath, forceLocal, activeInDev } = options;
  // it is increase dev build time by set default activeCommands ['build']
  const activeCommands = activeInDev ? ['start', 'build'] : ['build'];
  if (activeCommands.indexOf(command) > -1) {
    log.info('离线化构建项目，自动下载网络资源，请耐心等待');

    onGetWebpackConfig((config) => {
      config.plugin('ExtractCssAssetsWebpackPlugin')
        .use(ExtractCssAssetsWebpackPlugin, [{
          outputPath: outputPath || 'assets',
          relativeCssPath: relativeCssPath || '../',
          forceLocal: forceLocal || false,
        }]);
    });
  }
};
