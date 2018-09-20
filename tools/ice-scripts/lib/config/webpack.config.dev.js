const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');

const getWebpackConfigBasic = require('./webpack.config.basic');

module.exports = function getWebpackConfigDev({ entry, buildConfig = {} }) {
  const plugins = [];
  const baseConfig = getWebpackConfigBasic({ entry, buildConfig });

  if (!process.env.DISABLED_RELOAD) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (process.env.ANALYZER) {
    plugins.push(
      new BundleAnalyzerPlugin({
        // use a fixed port
        // http://127.0.0.1:$PORT/report.html
        analyzerPort: process.env.ANALYZER_PORT || '9000',
      })
    );
  }

  // 开发环境下 publicPath 指定为 / 与 webpack server 一致
  return webpackMerge(baseConfig, {
    devtool: 'cheap-module-source-map',
    output: {
      publicPath: '/',
    },
    plugins,
  });
};
