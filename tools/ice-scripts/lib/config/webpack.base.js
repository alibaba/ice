/* eslint-disable indent */
const path = require('path');
const Chain = require('webpack-chain');
const getPkgData = require('./packageJson');
const { appBuild, appPublic, appDirectory, appNodeModules, appHtml, resolveApp } = require('./paths');
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
  // TODO: may be need multi-entrypoints
  chainConfig.entry('entry')
    .add(resolveApp('src/index.js'));

  // set default output
  chainConfig.output
    .path(appBuild)
    .filename('[name].js')
    .publicPath(appPublic);

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

  // -------------- webpack module config --------------
  setLoaders(chainConfig, mode);

  // -------------- webpack plugin config --------------
  setPlugins(chainConfig, mode);

  // -------------- webpack optimization config --------------
  // by default, disable splitChunks
  chainConfig.optimization.splitChunks({
    cacheGroups: {},
  });

  return chainConfig;
};
