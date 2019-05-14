/* eslint-disable indent */
const Chain = require('webpack-chain');
const { defaultBuildPath, defaultPublicPath, appDirectory, appNodeModules, resolveApp } = require('./paths');
const setLoaders = require('./setWebpackLoaders');
const setPlugins = require('./setWebpackPlugins');

module.exports = (mode = 'development') => {
  const chainConfig = new Chain();

  chainConfig
    .mode(mode)
    .context(appDirectory);

  // set default entrypoints
  chainConfig.entry('index')
    .add(resolveApp('src/index.js'));

  // set default output
  chainConfig.output
    .path(defaultBuildPath)
    .filename('[name].js')
    .publicPath(defaultPublicPath);

  // set default resolve config
  chainConfig.resolve
    .modules
      .add('node_modules')
      .add(appNodeModules)
      .end()
    .extensions
      .merge(['.js', '.jsx', '.json', '.html', '.ts', '.tsx']);

  // set default externals config
  chainConfig.externals({});

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
