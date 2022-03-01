import type { Plugin } from '@ice/types';

const plugin: Plugin = ({ onGetConfig }) => {
  onGetConfig('web', (config) => {
    config.mode = 'production';
    return config;
  });
};

export default plugin;