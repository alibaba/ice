const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractCssAssetsWebpackPlugin = require('extract-css-assets-webpack-plugin');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const webpack = require('webpack');
const WebpackPluginImport = require('webpack-plugin-import');
const colors = require('chalk');

const AppendStyleWebpackPlugin = require('../plugins/append-style-webpack-plugin');
const normalizeEntry = require('../utils/normalizeEntry');
const getFaviconPath = require('../utils/getFaviconPath');

module.exports = function(paths, { buildConfig = {}, themeConfig = {} }) {
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
    new HtmlWebpackPlugin({
      inject: true,
      templateParameters: {
        NODE_ENV: process.env.NODE_ENV,
      },
      favicon: getFaviconPath([paths.appFaviconIco, paths.appFavicon]),
      template: paths.appHtml,
      minify: false,
    }),
    new webpack.DefinePlugin(defineVriables),
    new MiniCssExtractPlugin({
      filename: process.env.BUILD_HASH
        ? 'css/[name].[hash:6].css'
        : 'css/[name].css',
      chunkFilename: process.env.BUILD_HASH
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

  if (paths.publicUrl === './') {
    console.log(
      colors.yellow('Info:'),
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
      colors.yellow('Info:'),
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
