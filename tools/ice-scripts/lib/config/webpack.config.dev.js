const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');

const getWebpackConfigBasic = require('./webpack.config.basic');

const env = process.env;

module.exports = function getWebpackConfigDev({ entry, buildConfig = {} }) {
  const plugins = [];
  const baseConfig = getWebpackConfigBasic({ entry, buildConfig });

  if (process.env.HOT_RELOAD !== 'false' && process.env.DISABLED_RELOAD == 'false') {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  if (buildConfig.webpackBundleAnalyzer !== false && env.ANALYZER_PORT) {
    plugins.push(
      new BundleAnalyzerPlugin({
        // use a fixed port
        // http://127.0.0.1:$PORT/report.html
        analyzerPort: env.ANALYZER_PORT,
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
