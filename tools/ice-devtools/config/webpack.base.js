const webpack = require('webpack');
const WebpackConfig = require('webpack-chain');
const path = require('path');
const chalk = require('chalk');

const BABEL_LOADER = require.resolve('babel-loader');
const CSS_LOADER = require.resolve('css-loader');
const SASS_LOADER = require.resolve('sass-loader');
const LESS_LOADER = require.resolve('less-loader');
const HANDLEBARS_LOADER = require.resolve('handlebars-loader');
const ICE_SKIN_LOADER = require.resolve('ice-skin-loader');
const AWESOME_TYPESCRIPT_LOADER = require.resolve('awesome-typescript-loader');
const WEBPACK_HOT_CLIENT = require.resolve('webpack-hot-client/client');
const SimpleProgressPlugin = require('webpack-simple-progress-plugin');
const WebpackPluginImport = require('webpack-plugin-import');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require.resolve('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require.resolve('uglifyjs-webpack-plugin');

const getBabelConfig = require('./getBabelConfig');
const { getPkgJSON } = require('../utils/pkg-json');
const internalLibrary = require('../utils/internal-library');

const URL_LOADER = require.resolve('url-loader');
const URL_LOADER_LIMIT = 8192;

  // refs: https://github.com/webpack-contrib/mini-css-extract-plugin
const MiniCssExtractPluginLoader = MiniCssExtractPlugin.loader;

module.exports = function getWebpackBaseConfig(cwd, entries = {}) {
  const config = new WebpackConfig();

  config
    .mode(process.env.NODE_ENV === 'production' ? 'production' : 'development');

  const pkgJSON = getPkgJSON(cwd);
  const { buildConfig = {}, themeConfig = {} } = pkgJSON;
  const babelConfig = getBabelConfig(buildConfig);

  config.module
    .rule('babel')
    .test(/\.jsx?$/)
    .exclude
      .add(/node_modules/)
      .end()
    .use('babel')
    .loader(BABEL_LOADER)
    .options(babelConfig)
    .end();

  config.module
    .rule('typescript')
    .test(/\.tsx?$/)
    .exclude
      .add(/node_modules/)
      .end()
    .use('babel')
    .loader(BABEL_LOADER)
    .options(babelConfig)
    .end()
    .use('typescript')
    .loader(AWESOME_TYPESCRIPT_LOADER)
    .options({
      useCache: false,
    })
    .end();

  config.module
    .rule('css')
    .test(/\.css$/)
    .exclude
      .add(/\.module\.css$/)
      .end()
    .use('style')
    .loader(MiniCssExtractPluginLoader)
    .end()
    .use('css')
    .loader(CSS_LOADER)
    .end();

  const theme = buildConfig.theme || buildConfig.themePackage;

  if (theme) {
    console.log('');
    console.log(chalk.green('使用主题包: '), theme);
    console.log('');
  }

  const appNodeModules = path.resolve(cwd, 'node_modules');

  config.module
    .rule('scss')
    .test(/\.s[a|c]ss$/)
    .exclude.add(/\.module\.scss$/)
    .end()
    .use('style-loader')
    .loader(MiniCssExtractPluginLoader)
    .end()
    .use('css-loader')
    .loader(CSS_LOADER)
    .end()
    .use('scss-loader')
    .loader(SASS_LOADER)
    .end()
    .use('ice-skin-loader')
    .loader(ICE_SKIN_LOADER)
    .options({
      themeFile: theme && path.join(appNodeModules, `${theme}/variables.scss`),
      themeConfig,
    })
    .end();

  config.module
    .rule('less')
    .test(/\.less$/)
    .exclude.add(/\.module\.less$/)
    .end()
    .use('style-loader')
    .loader(MiniCssExtractPluginLoader)
    .end()
    .use('css-loader')
    .loader(CSS_LOADER)
    .end()
    .use('less-loader')
    .loader(LESS_LOADER)
    .options({
      javascriptEnabled: true
    })
    .end();

  config.module
    .rule('cssmodule')
    .test(/\.module\.css$/)
    .use('style-loader')
    .loader(MiniCssExtractPluginLoader)
    .end()
    .use('css-loader')
    .loader(CSS_LOADER)
    .options({
      sourceMap: true,
      modules: true,
      localIdentName: '[folder]--[local]--[hash:base64:7]',
    })
    .end();

  config.module
    .rule('scss-cssmodule')
    .test(/\.module\.scss$/)
    .use('style-loader')
    .loader(MiniCssExtractPluginLoader)
    .end()
    .use('css-loader')
    .loader(CSS_LOADER)
    .options({
      sourceMap: true,
      modules: true,
      localIdentName: '[folder]--[local]--[hash:base64:7]',
    })
    .end()
    .use('scss-loader')
    .loader(SASS_LOADER)
    .end()
    .use('ice-skin-loader')
    .loader(ICE_SKIN_LOADER)
    .options({
      themeFile: theme && path.join(appNodeModules, `${theme}/variables.scss`),
      themeConfig,
    })
    .end();

  config.module
    .rule('less-cssmodule')
    .test(/\.module\.less$/)
    .use('style-loader')
    .loader(MiniCssExtractPluginLoader)
    .end()
    .use('css-loader')
    .loader(CSS_LOADER)
    .options({
      sourceMap: true,
      modules: true,
      localIdentName: '[folder]--[local]--[hash:base64:7]',
    })
    .end()
    .use('less-loader')
    .loader(LESS_LOADER)
    .end();

  config.module
    .rule('woff2')
    .test(/\.woff2?$/)
    .use('url-loader')
    .loader(URL_LOADER)
    .options({
      limit: URL_LOADER_LIMIT,
      minetype: 'application/font-woff',
      name: 'fonts/[hash].[ext]',
    })
    .end();

  config.module
    .rule('ttf')
    .test(/\.ttf?$/)
    .use('url-loader')
    .loader(URL_LOADER)
    .options({
      limit: URL_LOADER_LIMIT,
      minetype: 'application/octet-stream',
      name: 'fonts/[hash].[ext]',
    })
    .end();

  config.module
    .rule('eot')
    .test(/\.eot?$/)
    .use('url-loader')
    .loader(URL_LOADER)
    .options({
      limit: URL_LOADER_LIMIT,
      minetype: 'application/vnd.ms-fontobject',
      name: 'fonts/[hash].[ext]',
    })
    .end();

  config.module
    .rule('svg')
    .test(/\.svg$/)
    .use('url-loader')
    .loader(URL_LOADER)
    .options({
      limit: URL_LOADER_LIMIT,
      minetype: 'image/svg+xml',
      name: 'images/[hash].[ext]',
    })
    .end();

  config.module
    .rule(/\.(png|jpg|jpeg|gif)$/i)
    .test(/\.(png|jpg|jpeg|gif)$/i)
    .use('url-loader')
    .loader(URL_LOADER) // default fallback is 'file-loader'
    .options({
      limit: URL_LOADER_LIMIT,
      name: 'images/[hash].[ext]',
    })
    .end();

  config.module
    .rule('hbs')
    .test(/\.hbs$/)
    .use('handlebars-loader')
    .loader(HANDLEBARS_LOADER)
    .end();

  config.resolve.alias.set('webpack-hot-client/client', WEBPACK_HOT_CLIENT);

  config.resolve.extensions
    .add('.js')
    .add('.jsx')
    .add('.json')
    .add('.ts')
    .add('.tsx');

  config.plugin('progress').use(SimpleProgressPlugin);

  config.plugin('define').use(webpack.DefinePlugin, [
    {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
  ]);

  config.plugin('css').use(MiniCssExtractPlugin, [
    {
      filename: "[name].css",
      chunkFilename: "[id].css"
    }
  ]);

  config.plugin('import').use(WebpackPluginImport, [
    internalLibrary.map((libraryName) => {
      return {
        libraryName,
        stylePath: 'style.js',
      };
    }),
  ]);

  // 依赖分析
  if (process.env.ANALYZER) {
    config.plugin('analyzer').use(BundleAnalyzerPlugin);
  }

  config.plugin('hot').use(webpack.HotModuleReplacementPlugin);
  Object.entries(entries).forEach((entry) => {
    const [key, val] = entry;
    config.entry(key).add(val);
  });
  config.context(cwd);
  config.output
    .path(cwd)
    .filename('[name].js')
    .publicPath('./');

  config.optimization
    .minimize(process.env.NODE_ENV === 'production')
    .minimizer('js')
    .use(UglifyJsPlugin, [{
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
    }])
    .end()
    .minimizer('css')
    .use(OptimizeCSSAssetsPlugin, [{
      cssProcessorOptions: { safe: true }
    }]);

  return config;
};
