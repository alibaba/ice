const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const webpackMerge = require('webpack-merge');
const webpack = require('webpack');

const getWebpackConfigBasic = require('./webpack.config.basic');
const cliInstance = require('../utils/cliInstance');

module.exports = function getWebpackConfigDev({ buildConfig = {} }) {
  const plugins = [];
  const baseConfig = getWebpackConfigBasic({ buildConfig });

  // 热更新
  if (!cliInstance.get('disabledReload')) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  }

  // 依赖分析
  if (cliInstance.get('analyzer')) {
    plugins.push(
      new BundleAnalyzerPlugin({
        // use a fixed port
        // http://127.0.0.1:$PORT/report.html
        analyzerPort: cliInstance.get('analyzerPort') || '9000',
      })
    );
  }

  // 配置合并
  // 开发环境下 publicPath 指定为 / 与 webpack server 一致
  return webpackMerge(baseConfig, {
    devtool: 'cheap-module-source-map',
    output: {
      publicPath: '/',
    },
    plugins,
  });
};
