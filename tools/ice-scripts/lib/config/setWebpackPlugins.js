/* eslint-disable indent */
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const getFaviconPath = require('../utils/getFaviconPath');
const { appFaviconIco, appFavicon, appPublic, defaultAppHtml, defaultBuildPath } = require('./paths');

module.exports = (chainConfig, mode = 'development') => {
  const defineVariables = {
    'process.env.NODE_ENV': JSON.stringify(mode || 'development'),
  };

  chainConfig
    .plugin('DefinePlugin')
      .use(webpack.DefinePlugin, [defineVariables])
      .end()
    .plugin('MiniCssExtractPlugin')
      .use(MiniCssExtractPlugin, [{
        filename: '[name].css',
      }])
      .end()
    .plugin('FilterWarningsPlugin')
      .use(FilterWarningsPlugin, [{
        exclude: /Conflicting order between:/,
      }])
      .end()
    .plugin('SimpleProgressPlugin')
      .use(SimpleProgressPlugin)
      .end()
    .plugin('CaseSensitivePathsPlugin')
      .use(CaseSensitivePathsPlugin)
      .end()
    .plugin('HtmlWebpackPlugin')
      .use(HtmlWebpackPlugin, [{
        inject: true,
        templateParameters: {
          NODE_ENV: process.env.NODE_ENV,
        },
        favicon: getFaviconPath([appFaviconIco, appFavicon]),
        template: defaultAppHtml,
        minify: false,
      }])
      .end()
    .plugin('CopyWebpackPlugin') // 默认将 public/ 目录下的文件复制到 build/ 目录下
      .use(CopyWebpackPlugin, [[
        {
          from: appPublic,
          to: defaultBuildPath,
          ignore: ['index.html'],
        },
      ]]);
};
