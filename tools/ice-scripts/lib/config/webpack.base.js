/* eslint-disable indent */
const Chain = require('webpack-chain');
const { appDirectory, appNodeModules } = require('./paths');
const setLoaders = require('./setWebpackLoaders');
const setPlugins = require('./setWebpackPlugins');

module.exports = (mode = 'development') => {
  const chainConfig = new Chain();

  chainConfig
    .mode(mode)
    .context(appDirectory);

  // set default output
  chainConfig.output
    .filename('[name].js');

  // set default resolve config
  chainConfig.resolve
    .modules
      .add('node_modules')
      .add(appNodeModules)
      .end()
    .extensions
      .merge(['.js', '.jsx', '.json', '.html', '.ts', '.tsx']);

  // -------------- webpack loader config --------------
  setLoaders(chainConfig, mode);

  // -------------- webpack plugin config --------------
  setPlugins(chainConfig, mode);

  return chainConfig;
};
