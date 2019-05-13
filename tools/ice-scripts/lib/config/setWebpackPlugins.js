/* eslint-disable indent */
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const WebpackPluginImport = require('webpack-plugin-import');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CheckIceComponentsDepsPlugin = require('../utils/check-ice-components-dep');
const getFaviconPath = require('../utils/getFaviconPath');
const getPkgData = require('./getPackageJson');
const { appDirectory, appHtml, appFaviconIco, appFavicon, appPublic, appBuild } = require('./paths');

module.exports = (chainConfig, mode = 'development') => {
  const packageJson = getPkgData(appDirectory);
  const defineVriables = {
    'process.env.NODE_ENV': JSON.stringify(mode || 'development'),
  };

  chainConfig
    .plugin('DefinePlugin')
      .use(webpack.DefinePlugin, [defineVriables])
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
    .plugin('CheckIceComponentsDepsPlugin')
      .use(CheckIceComponentsDepsPlugin, [{ packageJson }])
      .end()
    .plugin('SimpleProgressPlugin')
      .use(SimpleProgressPlugin)
      .end()
    .plugin('CaseSensitivePathsPlugin')
      .use(CaseSensitivePathsPlugin)
      .end()
    .plugin('WebpackPluginImport')
      .use(WebpackPluginImport, [[
        {
          libraryName: /^@icedesign\/base\/lib\/([^/]+)/,
          stylePath: 'style.js',
        },
        {
          libraryName: /@icedesign\/.*/,
          stylePath: 'style.js',
        },
        {
          libraryName: /@ali\/ice-.*/,
          stylePath: 'style.js',
        },
        {
          libraryName: /^@alife\/next\/lib\/([^/]+)/,
          stylePath: 'style.js',
        },
        {
          libraryName: /^@alifd\/next\/lib\/([^/]+)/,
          stylePath: 'style.js',
        },
        {
          libraryName: /@alifd\/.*/,
          stylePath: 'style.js',
        },
      ]])
      .end()
    .plugin('IgnorePlugin')
      .use(webpack.IgnorePlugin, [/^\.\/locale$/, /moment$/])
      .end()
    .plugin('HtmlWebpackPlugin')
      .use(HtmlWebpackPlugin, [{
        inject: true,
        templateParameters: {
          NODE_ENV: process.env.NODE_ENV,
        },
        favicon: getFaviconPath([appFaviconIco, appFavicon]),
        template: appHtml,
        minify: false,
      }])
      .end();

  // 构建项目时将 public 目录下的静态文件夹复制到构建目录下
  if (packageJson.type === 'project') {
    chainConfig
      .plugin('CopyWebpackPlugin')
        .use(CopyWebpackPlugin, [[
          {
            from: appPublic,
            to: appBuild,
            ignore: ['index.html'],
          },
        ]]);
  }
};
