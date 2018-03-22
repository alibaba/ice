const webpackMerge = require('webpack-merge');
const getUserConfig = require('./getUserConfig');
const getRules = require('./getRules');
const getPlugins = require('./getPlugins');
const processEntry = require('./processEntry');
const { differenceWith } = require('lodash');

/**
 * 可以在 buildConfig 中覆盖的配置项:
 *  1. devtool: ''
 *  2. output: {}
 *  3. publicPath
 *  4. externals
 *  5. entry
 */

/**
 * 合并 plugin 操作，
 * @param  {array} uniques plugin 名单，在这名单内的插件会过滤掉，不会出现两份
 * @return {array}
 */
const pluginsUnique = (uniques) => {
  const getter = (plugin) => plugin.constructor && plugin.constructor.name;
  return (a, b, k) => {
    if (k == 'plugins') {
      return [
        ...differenceWith(a, b, (item) => uniques.indexOf(getter(item)) >= 0),
        ...b,
      ];
    }
  };
};

module.exports = function getWebpackConfigBasic(
  entry,
  paths,
  buildConfig = {},
  themeConfig = {}
) {
  const webpackConfig = {
    devtool: buildConfig.devtool || 'cheap-module-source-map',
    context: paths.appDirectory,
    entry,
    output: Object.assign(
      {
        path: paths.appBuild,
        filename: '[name].js',
        publicPath: paths.servedPath,
      },
      buildConfig.output || {}
    ),
    resolve: {
      modules: [paths.appNodeModules, 'node_modules'],
      extensions: ['.js', '.jsx', '.json', '.html'],
    },
    externals: buildConfig.externals || {
      react: 'window.React',
      'react-dom': 'window.ReactDOM',
    },
    module: {
      rules: getRules(paths, buildConfig, themeConfig),
    },
    plugins: getPlugins(paths, buildConfig, themeConfig),
  };

  const userConfig = getUserConfig();
  const finalWebpackConfig = webpackMerge({
    customizeArray: pluginsUnique(['ExtractTextPlugin']),
  })(webpackConfig, userConfig);

  finalWebpackConfig.entry = processEntry(finalWebpackConfig.entry);

  return finalWebpackConfig;
};
