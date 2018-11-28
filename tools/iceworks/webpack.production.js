const ExtractCssAssetsWebpackPlugin = require('extract-css-assets-webpack-plugin');
const merge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

const common = require('./webpack.common');

const config = {
  mode: 'production',
  devtool: 'none',
  optimization: {
    minimize: false, // 压缩代码后运行失败，先关闭
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: {
            unused: false,
            warnings: false,
          },
          output: {
            ascii_only: true,
            comments: 'some',
            beautify: false,
          },
          mangle: true,
        },
      }),
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      __OSS_CDN_DOMAIN__: JSON.stringify(
        'https://iceworks.oss-cn-hangzhou.aliyuncs.com'
      ),
    }),
    new ExtractCssAssetsWebpackPlugin(),
  ],
};

const homeConfig = merge({}, common.home, config);
module.exports = [homeConfig];
