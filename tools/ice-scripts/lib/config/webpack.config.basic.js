const { differenceWith } = require('lodash');
const webpackMerge = require('webpack-merge');
const getUserConfig = require('./getUserConfig');
const getRules = require('./getRules');
const getPlugins = require('./getPlugins');
const processEntry = require('./processEntry');
const getEntryByPages = require('./getEntryByPages');
const pkg = require('./packageJson');
const checkTemplateHasReact = require('../utils/checkTemplateHasReact');
const debug = require('../debug');

/**
 * 可以在 buildConfig 中覆盖的配置项:
 *  1. output: {}
 *  2. publicPath
 *  3. externals
 *  4. entry
 */

/**
 * 合并 plugin 操作，
 * @param  {array} uniques plugin 名单，在这名单内的插件会过滤掉，不会出现两份，以用户的配置为准。
 * @return {array}
 */
const pluginsUnique = (uniques) => {
  const getter = (plugin) => plugin.constructor && plugin.constructor.name;
  return (a, b, k) => {
    if (k == 'plugins') {
      return [
        ...differenceWith(a, b, (item, item2) => {
          return (
            uniques.indexOf(getter(item)) >= 0 && getter(item) == getter(item2)
          );
        }),
        ...b,
      ];
    }
  };
};

module.exports = function getWebpackConfigBasic(
  entry,
  paths,
  buildConfig = {}
) {
  const { themeConfig = {} } = pkg;
  const hasExternalReact = checkTemplateHasReact(paths.appHtml);
  debug.info('hasExternalReact', hasExternalReact);
  const webpackConfig = {
    mode: process.env.NODE_ENV,
    context: paths.appDirectory,
    entry,
    output: Object.assign(
      {
        path: paths.appBuild,
        filename: process.env.BUILD_HASH
          ? 'js/[name].[hash:6].js'
          : 'js/[name].js',
        publicPath: paths.servedPath,
      },
      buildConfig.output || {}
    ),
    resolve: {
      modules: [paths.appNodeModules, 'node_modules'],
      extensions: ['.js', '.jsx', '.json', '.html'],
    },
    externals:
      buildConfig.externals || hasExternalReact
        ? {
            react: 'window.React',
            'react-dom': 'window.ReactDOM',
          }
        : {},
    module: {
      rules: getRules(paths, buildConfig),
    },
    plugins: getPlugins(paths, { buildConfig, themeConfig }),
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'all',
            minChunks: 2,
          },
        },
      },
    },
  };

  const userConfig = getUserConfig();
  const finalWebpackConfig = webpackMerge({
    customizeArray: pluginsUnique(['HtmlWebpackPlugin']),
  })(webpackConfig, userConfig);

  if (finalWebpackConfig.entry) {
    finalWebpackConfig.entry = processEntry(finalWebpackConfig.entry);
  } else {
    finalWebpackConfig.entry = processEntry(getEntryByPages());
  }

  return finalWebpackConfig;
};
