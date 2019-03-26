const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractCssAssetsWebpackPlugin = require('extract-css-assets-webpack-plugin');
const fs = require('fs');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const webpack = require('webpack');
const WebpackPluginImport = require('webpack-plugin-import');

const AppendStyleWebpackPlugin = require('../plugins/append-style-webpack-plugin');
const CheckIceComponentsDepsPlugin = require('../plugins/check-ice-components-dep');
const normalizeEntry = require('../utils/normalizeEntry');
const paths = require('./paths');
const getEntryHtmlPlugins = require('./getEntryHtmlPlugins');
const cliInstance = require('../utils/cliInstance');
const log = require('../utils/log');

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
      filename: path.join(buildConfig.outputAssetsPath.css || '', filename)
    }),
    // FIX ISSUE: https://github.com/webpack-contrib/mini-css-extract-plugin/issues/250
    new FilterWarningsPlugin({
      exclude: /Conflicting order between:/,
    }),
    new CheckIceComponentsDepsPlugin({
      pkg
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

  if (paths.publicUrl === './') {
    log.info('离线化构建项目，自动下载网络资源，请耐心等待');
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
  let themeNextVersion;

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

    themeNextVersion = (/^@alif(e|d)\/theme-/.test(themePackage) || themePackage === '@icedesign/theme') ? '1.x' : '0.x';
  }

  if (iconScssPath && fs.existsSync(iconScssPath)) {
    const appendStylePluginOption = {
      type: 'sass',
      srcFile: iconScssPath,
      variableFile: variableFilePath,
      compileThemeIcon: true,
      themeNextVersion,
      pkg,
      distMatch: (chunkName, compilerEntry, compilationPreparedChunks) => {
        const entriesAndPreparedChunkNames = normalizeEntry(
          compilerEntry,
          compilationPreparedChunks
        );
        // 仅对 css 的 chunk 做 处理
        if (entriesAndPreparedChunkNames.length && /\.css$/.test(chunkName)) {
          // css/index.css -> index
          const assetsFromEntry = path.basename(chunkName, path.extname(chunkName));
          if (entriesAndPreparedChunkNames.indexOf(assetsFromEntry) !== -1) {
            return true;
          }
        }
        return false;
      },
    };
    plugins.push(new AppendStyleWebpackPlugin(appendStylePluginOption));
  }

  // HACK 1.x 不会走到这个逻辑
  if (skinOverridePath && fs.existsSync(skinOverridePath)) {
    // eslint-disable-next-line no-console
    log.info('皮肤 override 文件存在', path.join(themePackage, 'override.scss'));
    plugins.push(
      new AppendStyleWebpackPlugin({
        variableFile: variableFilePath,
        appendPosition: 'footer',
        // type: 'sass', // 不需要指定 type，与 distMatch 互斥
        srcFile: skinOverridePath,
        distMatch: /\.css/,
        themeNextVersion,
        compileThemeIcon: false,
        pkg
      })
    );
  }
  return plugins;
};
