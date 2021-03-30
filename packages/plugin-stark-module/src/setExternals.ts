import { PartialPlugin, Externals, Runtime, Options } from './types';

const getExternals = (externals: Externals) => {
  const localExternals = { ...externals };
  Object.keys(localExternals)
    .forEach(key => {
      if (typeof localExternals[key] !== 'string') {
        if (!(localExternals[key] as Runtime).root) {
          throw new Error('[build-plugin-icestark-module] property root is missing in externals!');
        }

        if (!(localExternals[key] as Runtime)?.commonjs2) {
          localExternals[key] = (localExternals[key] as Runtime).root;
        }
      }
    });
  return localExternals;
};

const setExternals = ({ onGetWebpackConfig }: PartialPlugin, { moduleExternals }: Options) => {
  onGetWebpackConfig('icestark-module', (config) => {
    config.externals(getExternals(moduleExternals) as any);
  });
};

export default setExternals;
