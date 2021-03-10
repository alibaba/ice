import { PartialPlugin, Externals, Runtime, Options } from './types';

const getExternals = (externals: Externals) => {
  const localExternals = { ...externals };
  Object.keys(localExternals)
    .forEach(key => {
      if (typeof localExternals[key] !== 'string') {
        if (!(localExternals[key] as Runtime).root) {
          throw new Error('[build-plugin-icestark-module] property root is missing in externals!');
        }
        localExternals[key] = (localExternals[key] as Runtime).root;
      }
    });
  return localExternals;
};

const setExternals = ({ onGetWebpackConfig }: PartialPlugin, { externals }: Options) => {
  onGetWebpackConfig('icestark-module', (config) => {
    config.externals(getExternals(externals) as any);
  });
};

export default setExternals;
