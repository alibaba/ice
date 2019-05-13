/* eslint-disable indent */
const path = require('path');
const Chain = require('webpack-chain');
const getPkgData = require('./getPackageJson');
const { appBuild, appDirectory, appNodeModules, appHtml, resolveApp } = require('./paths');
const checkTemplateHasReact = require('../utils/checkTemplateHasReact');
const setLoaders = require('./setWebpackLoaders');
const setPlugins = require('./setWebpackPlugins');

module.exports = (mode = 'development') => {
  const chainConfig = new Chain();
  const packageJson = getPkgData(appDirectory);
  const hasExternalReact = checkTemplateHasReact(appHtml);

  chainConfig
    .mode(mode)
    .context(appDirectory);

  // set default entrypoints
  chainConfig.entry('entry')
    .add(resolveApp('src/index.js'));

  // set default output
  chainConfig.output
    .path(appBuild)
    .filename('[name].js')
    .publicPath('/');

  // set default resolve config
  chainConfig.resolve
    .modules
      .add('node_modules')
      .add(appNodeModules)
      .end()
    .extensions
      .merge(['.js', '.jsx', '.json', '.html', '.ts', '.tsx'])
      .end()
    .alias
      .set(packageJson.name, path.resolve(appDirectory, 'src/index'));

  // set default externals config
  chainConfig.externals(
    hasExternalReact ? { react: 'window.React', 'react-dom': 'window.ReactDOM' } : {}
  );

  // -------------- webpack loader config --------------
  setLoaders(chainConfig, mode);

  // -------------- webpack plugin config --------------
  setPlugins(chainConfig, mode);

  // -------------- webpack optimization config --------------
  chainConfig.optimization.splitChunks({
    cacheGroups: {
      vendor: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendor',
        chunks: 'initial',
        minChunks: 2,
      },
    },
  });

  return chainConfig;
};
