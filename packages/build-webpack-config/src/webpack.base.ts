import * as Config from '@builder/pack/deps/webpack-chain';
import setWebpackLoaders from './setWebpackLoaders';
import setWebpackPlugins from './setWebpackPlugins';

export default (mode) => {
  const config = new Config();

  config.mode(mode);
  config.resolve.extensions
    .merge(['.js', '.json', '.jsx', '.ts', '.tsx', '.mjs', '.mts']);
  // webpack loaders
  setWebpackLoaders(config);
  // webpack plugins
  setWebpackPlugins(config);

  return config;
};
