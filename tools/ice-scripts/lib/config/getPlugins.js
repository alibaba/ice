const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const colors = require('chalk');
const ExtractCssAssetsWebpackPlugin = require('extract-css-assets-webpack-plugin');
const fs = require('fs');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const webpack = require('webpack');
const WebpackPluginImport = require('webpack-plugin-import');

const AppendStyleWebpackPlugin = require('../plugins/append-style-webpack-plugin');
const normalizeEntry = require('../utils/normalizeEntry');
const paths = require('./paths');
const getEntryHtmlPlugins = require('./getEntryHtmlPlugins');

module.exports = function({ buildConfig = {}, themeConfig = {}, entry }) {
  const defineVriables = {
    'process.env.NODE_ENV': JSON.stringify(
      process.env.NODE_ENV || 'development'
    ),
  };

  // support theme type, eg. dark or light
  if (themeConfig && typeof themeConfig.theme === 'string') {
    defineVriables.THEME = JSON.stringify(themeConfig.theme);
  }

  const plugins = [
    new webpack.DefinePlugin(defineVriables),
    new MiniCssExtractPlugin({
      filename: process.env.HASH ? 'css/[name].[hash:6].css' : 'css/[name].css',
      chunkFilename: process.env.HASH
        ? 'css/[id].[hash:6].css'
        : 'css/[id].css',
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
  ];

  // 增加 html 输出，支持多页面应用
  Array.prototype.push.apply(plugins, getEntryHtmlPlugins(entry));

  if (paths.publicUrl === './') {
    console.log(
      colors.green('Info:'),
      '离线化构建项目，自动下载网络资源，请耐心等待'
    );
    plugins.push(
      new ExtractCssAssetsWebpackPlugin({
        outputPath: 'assets',
        relativeCssPath: '../',
      })
    );
  }

  const themePackage = buildConfig.theme || buildConfig.themePackage;
  let iconScssPath;
  let skinOverridePath;
  let variableFilePath;

  if (themePackage) {
    variableFilePath = path.resolve(
      paths.appNodeModules,
      `${themePackage}/variables.scss`
    );
    iconScssPath = path.resolve(
      paths.appNodeModules,
      `${themePackage}/icons.scss`
    );
    skinOverridePath = path.join(
      paths.appNodeModules,
      themePackage,
      'override.scss'
    );
  }

  if (iconScssPath && fs.existsSync(iconScssPath)) {
    const appendStylePluginOption = {
      type: 'sass',
      srcFile: iconScssPath,
      variableFile: variableFilePath,
      distMatch: (chunkName, compilerEntry, compilationPreparedChunks) => {
        // TODO
        const entriesAndPreparedChunkNames = normalizeEntry(
          compilerEntry,
          compilationPreparedChunks
        );
        // 仅对 css 的 chunk 做 处理
        if (entriesAndPreparedChunkNames.length && /\.css$/.test(chunkName)) {
          const assetsFromEntry = chunkName.replace(/\.\w+$/, '');
          if (entriesAndPreparedChunkNames.indexOf(assetsFromEntry) !== -1) {
            return true;
          }
        }
        return false;
      },
    };
    plugins.push(new AppendStyleWebpackPlugin(appendStylePluginOption));
  }

  if (skinOverridePath && fs.existsSync(skinOverridePath)) {
    // eslint-disable-next-line no-console
    console.log(
      colors.green('Info:'),
      '皮肤 override 文件存在',
      path.join(themePackage, 'override.scss')
    );
    plugins.push(
      new AppendStyleWebpackPlugin({
        variableFile: variableFilePath,
        appendPosition: 'footer',
        type: 'sass',
        srcFile: skinOverridePath,
        distMatch: /\.css/,
      })
    );
  }
  return plugins;
};
