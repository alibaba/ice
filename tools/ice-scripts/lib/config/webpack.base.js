/* eslint-disable indent */
const Chain = require('webpack-chain');
const { appDirectory } = require('./paths');
const setLoaders = require('./setWebpackLoaders');
const setPlugins = require('./setWebpackPlugins');

module.exports = (mode = 'development') => {
  const chainConfig = new Chain();

  chainConfig
    .mode(mode)
    .context(appDirectory);

  // -------------- webpack loader config --------------
  setLoaders(chainConfig, mode);

  // -------------- webpack plugin config --------------
  setPlugins(chainConfig, mode);

  return chainConfig;
};
