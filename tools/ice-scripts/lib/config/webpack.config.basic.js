const webpackMerge = require('webpack-merge');
const getUserConfig = require('./getUserConfig');
const getRules = require('./getRules');
const getPlugins = require('./getPlugins');
const paths = require('./paths');
/**
 * 可以在 buildConfig 中覆盖的配置项:
 *  1. devtool: ''
 *  2. output: {}
 *  3. publicPath
 *  4. externals
 *  5. entry
 */
module.exports = function getWebpackConfigBasic(
  entry,
  paths,
  buildConfig = {}
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
      rules: getRules(paths, buildConfig),
    },
    plugins: getPlugins(paths, buildConfig),
  };

  const userConfig = getUserConfig();
  return webpackMerge(webpackConfig, userConfig);
};
