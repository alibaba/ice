const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractCssAssetsWebpackPlugin = require('extract-css-assets-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const webpack = require('webpack');
const WebpackPluginImport = require('webpack-plugin-import');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CheckIceComponentsDepsPlugin = require('../utils/check-ice-components-dep');
const paths = require('./paths');
const getEntryHtmlPlugins = require('./getEntryHtmlPlugins');
const cliInstance = require('../utils/cliInstance');
const log = require('../utils/log');
const pkgData = require('./packageJson')();

module.exports = ({ buildConfig = {}, themeConfig = {}, entry, pkg = {} }) => {
  const defineVriables = {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development'
    ),
  };

  // support theme type, eg. dark or light
  if (themeConfig && typeof themeConfig.theme === 'string') {
    defineVriables.THEME = JSON.stringify(themeConfig.theme);
  }

  const filename = cliInstance.get('hash') ? '[name].[hash:6].css' : '[name].css';

  const plugins = [
    new webpack.DefinePlugin(defineVriables),
    new MiniCssExtractPlugin({
      filename: path.join(buildConfig.outputAssetsPath.css || '', filename),
    }),
    // FIX ISSUE: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250
    new FilterWarningsPlugin({
      exclude: /Conflicting order between:/,
    }),
    new CheckIceComponentsDepsPlugin({
      pkg,
    }),
    new SimpleProgressPlugin(),
    new CaseSensitivePathsPlugin(),
    new WebpackPluginImport([
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
    ]),
    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how Webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ];

  // 增加 html 输出，支持多页面应用
  Array.prototype.push.apply(plugins, getEntryHtmlPlugins(entry));

  if (buildConfig.localization) {
    log.info('离线化构建项目，自动下载网络资源，请耐心等待');
    plugins.push(
      new ExtractCssAssetsWebpackPlugin({
        outputPath: 'assets',
        relativeCssPath: '../',
      })
    );
  }

  // 构建项目时将 public 目录下的静态文件夹复制到构建目录下
  if (pkgData.type === 'project') {
    plugins.push(
      new CopyWebpackPlugin([
        {
          from: paths.appPublic,
          to: paths.appBuild,
          ignore: ['index.html'],
        },
      ])
    );
  }

  return plugins;
};
