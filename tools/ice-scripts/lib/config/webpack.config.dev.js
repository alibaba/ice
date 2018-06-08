const webpackMerge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const webpack = require('webpack');
const getWebpackConfigBasic = require('./webpack.config.basic');

const env = process.env;

module.exports = function getWebpackConfigDev(entry, paths, options = {}) {
  const baseConfig = getWebpackConfigBasic(entry, paths, options);

  const plugins = [new webpack.HotModuleReplacementPlugin()];

  if (options.webpackBundleAnalyzer !== false && env.ANALYZER_PORT) {
    plugins.push(
      new BundleAnalyzerPlugin({
        // use a fixed port
        // http://127.0.0.1:$PORT/report.html
        analyzerPort: env.ANALYZER_PORT,
      })
    );
  }
  // 开发环境下 publicPath 指定为 /build/ 与 webpack server 一致
  return webpackMerge(baseConfig, {
    devtool: 'cheap-module-source-map',
    output: {
      publicPath: '/build/',
    },
    plugins,
  });
};
