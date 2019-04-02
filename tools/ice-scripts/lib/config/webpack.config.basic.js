const { differenceWith } = require('lodash');
const webpackMerge = require('webpack-merge');
const path = require('path');

const getUserConfig = require('./getUserConfig');
const getRules = require('./getRules');
const getPlugins = require('./getPlugins');
const processEntry = require('./processEntry');
const getEntryByPages = require('./getEntryByPages');
const getResolveAlias = require('./getResolveAlias');
const pkg = require('./packageJson');
const checkTemplateHasReact = require('../utils/checkTemplateHasReact');
const log = require('../utils/log');
const paths = require('./paths');
const cliInstance = require('../utils/cliInstance');

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
    if (k === 'plugins') {
      return [
        ...differenceWith(a, b, (item, item2) => {
          return (
            uniques.indexOf(getter(item)) >= 0 && getter(item) === getter(item2)
          );
        }),
        ...b,
      ];
    }
  };
};

module.exports = function getWebpackConfigBasic({ entry, buildConfig = {} }) {
  const { themeConfig = {} } = pkg;
  const hasExternalReact = checkTemplateHasReact(paths.appHtml);

  if (buildConfig.output && buildConfig.output.path) {
    buildConfig.output.path = path.resolve(paths.appDirectory, buildConfig.output.path);
  }

  buildConfig.outputAssetsPath = {
    css: 'css',
    js: 'js',
    ...buildConfig.outputAssetsPath,
  };

  log.verbose('hasExternalReact', hasExternalReact);

  log.info('--inject-babel: ', cliInstance.get('injectBabel'));

  const webpackConfig = {
    mode: process.env.NODE_ENV,
    context: paths.appDirectory,
    entry,
    output: Object.assign(
      {
        path: paths.appBuild,
        filename: path.join(buildConfig.outputAssetsPath.js || '', (cliInstance.get('hash') ? '[name].[hash:6].js' : '[name].js')),
        publicPath: paths.servedPath,
      },
      buildConfig.output || {}
    ),
    resolve: {
      modules: ['node_modules', paths.appNodeModules],
      extensions: ['.js', '.jsx', '.json', '.html', '.ts', '.tsx'],
      alias: getResolveAlias(buildConfig),
    },
    externals: {
      ...(hasExternalReact ? { react: 'window.React', 'react-dom': 'window.ReactDOM' } : {}),
      ...buildConfig.externals,
    },
    module: {
      rules: getRules(buildConfig, themeConfig),
    },
    plugins: getPlugins({ entry, buildConfig, themeConfig, pkg }),
    optimization: {
      splitChunks: {
        cacheGroups: {},
      },
    },
  };

  // HACK
  if (pkg.type === 'component' || pkg.type === 'block') {
    buildConfig.disableVendor = true;
  }

  if (buildConfig.disableVendor) {
    log.info('buildCondfig.disableVendor', buildConfig.disableVendor);
  } else {
    webpackConfig.optimization.splitChunks.cacheGroups = {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'initial',
        minChunks: 2,
      },
    };
  }

  const userConfig = getUserConfig();
  const finalWebpackConfig = webpackMerge({
    customizeArray: pluginsUnique(['HtmlWebpackPlugin']),
  })(webpackConfig, userConfig);

  // 单页应用 or 多页应用
  if (finalWebpackConfig.entry) {
    finalWebpackConfig.entry = processEntry(finalWebpackConfig.entry);
  } else {
    finalWebpackConfig.entry = processEntry(getEntryByPages());
  }

  return finalWebpackConfig;
};
