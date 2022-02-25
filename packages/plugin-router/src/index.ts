import type { Plugin } from '@ice/types';

const plugin: Plugin = ({ onGetConfig }) => {
  // FIXME: types need to return config
  // @ts-expect-error
  onGetConfig('web', (config) => {
    config.mode = 'production';
    return config;
  });
};

export default plugin;