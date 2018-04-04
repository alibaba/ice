const path = require('path');
const fs = require('fs');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const WebpackPluginImport = require('webpack-plugin-import');
const AppendStyleWebpackPlugin = require('../plugins/append-style-webpack-plugin');
const normalizeEntry = require('../utils/normalizeEntry');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function(paths, options = {}, themeConfig = {}) {
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
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: false,
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true,
      // },
    }),
    new webpack.DefinePlugin(defineVriables),

    new ExtractTextPlugin({
      filename: 'css/[name].css',
      disable: false,
      allChunks: true,
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
    ]),
  ];

  const themePackage = options.theme || options.themePackage;
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
      distMatch: function(chunkName, compilerEntry, compilationPreparedChunks) {
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
    console.log('皮肤 override 文件存在, 添加...');
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
