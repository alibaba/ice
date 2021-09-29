const HtmlWebpackPlugin = require('@builder/pack/deps/html-webpack-plugin');
const { getWebOutputPath, logWebpackConfig } = require('./utils');

module.exports = (api) => {
  const { context, onHook, onGetWebpackConfig } = api;

  onHook('before.build.run', ({ config }) => {
    logWebpackConfig(config);
  });
  onGetWebpackConfig((config) => {
    const outputPath = getWebOutputPath(context);
    config.output.path(outputPath);
    // make a copy of html-webpack-plugin to generate 404.html
    if (config.plugins.get('HtmlWebpackPlugin')) {
      config
        .plugin('HtmlWebpackPlugin_404')
        .use(HtmlWebpackPlugin, [{
          ...config.plugin('HtmlWebpackPlugin').get('args')[0],
          filename: '404.html',
        }]);
    }
  });
};
