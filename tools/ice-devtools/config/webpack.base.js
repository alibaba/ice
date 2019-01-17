const webpack = require('webpack');
const WebpackConfig = require('webpack-chain');
const path = require('path');
const debug = require('debug')('ice:webpack:base');
const chalk = require('chalk');

const BABEL_LOADER = require.resolve('babel-loader');
const STYLE_LOADER = require.resolve('style-loader');
const CSS_LOADER = require.resolve('css-loader');
const SASS_LOADER = require.resolve('sass-loader');
const LESS_LOADER = require.resolve('less-loader');
const HANDLEBARS_LOADER = require.resolve('handlebars-loader');

const WEBPACK_HOT_CLIENT = require.resolve('webpack-hot-client/client');
// const VUE_STYLE_LOADER = require.resolve('vue-style-loader');
// const VUE_LOADER = require.resolve('vue-loader');
const WebpackPluginImport = require('webpack-plugin-import');

const URL_LOADER = require.resolve('url-loader');
const URL_LOADER_LIMIT = 8192;

const getBabelConfig = require('./getBabelConfig');
const ICE_SKIN_LOADER = require.resolve('ice-skin-loader');
const { getPkgJSON } = require('../utils/pkg-json');

module.exports = function getWebpackBaseConfig(cwd, entries = {}) {
  const config = new WebpackConfig();
  // debug('loaders: &')
  config
    .mode(process.env.NODE_ENV === 'production' ? 'production' : 'development')
    .externals({
      react: 'React',
      'react-dom': 'ReactDOM',
      vue: 'Vue',
    });

  config.module
    .rule('babel')
    .test(/\.jsx?$/)
    .use('babel')
    .loader(BABEL_LOADER)
    .options(getBabelConfig())
    .end();

  config.module
    .rule('css')
    .test(/\.css$/)
    .use('style')
    .loader(STYLE_LOADER)
    .end()
    .use('css')
    .loader(CSS_LOADER)
    .end();

  const pkgJSON = getPkgJSON(cwd);
  const { buildConfig = {}, themeConfig = {} } = pkgJSON;
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
    .use('style-loader')
    .loader(STYLE_LOADER)
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
    .add('.vue');

  config.plugin('define').use(webpack.DefinePlugin, [
    {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    },
  ]);

  config.plugin('import').use(WebpackPluginImport, [
    [
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
    ],
  ]);

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
  return config;
};
