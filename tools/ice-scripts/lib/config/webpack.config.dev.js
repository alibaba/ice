const webpackMerge = require('webpack-merge');
const WatchMissingNodeModulesPlugin = require('react-dev-utils/WatchMissingNodeModulesPlugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getWebpackConfigBasic = require('./webpack.config.basic');
const env = process.env;

module.exports = function getWebpackConfigDev(entry, paths, options = {}) {
  const baseConfig = getWebpackConfigBasic(entry, paths, options);

  const plugins = [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
    }),

    new WatchMissingNodeModulesPlugin(paths.appNodeModules),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ];

  if (options.webpackBundleAnalyzer !== false && env.ANALYZER_PORT) {
    plugins.push(
      new BundleAnalyzerPlugin({
        // use a fixed port
        // http://127.0.0.1:$PORT/report.html
        analyzerPort: env.ANALYZER_PORT,
      })
    );
  }

  return webpackMerge(baseConfig, {
    devtool: 'cheap-module-source-map',
    output: {
      publicPath: '/build/',
    },
    plugins,
  });
};
