const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const common = require('./webpack.common');
const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');

const config = {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      __OSS_CDN_DOMAIN__: JSON.stringify(
        'https://iceworks-beta.oss-cn-hangzhou.aliyuncs.com'
      ),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin(),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'renderer/src'),
    watchContentBase: true,
    publicPath: '/',
    compress: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    port: 7001,
    stats: {
      modules: false,
      chunkModules: false,
      chunks: false,
    },
  },
};

const homeConfig = merge({}, common.home, config);

module.exports = [homeConfig];
