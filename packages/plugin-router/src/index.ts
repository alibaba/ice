import type { FrameworkPlugin } from '@ice/service';

const plugin: FrameworkPlugin = ({ onGetConfig }) => {
  // FIXME: types need to return config
  // @ts-expect-error
  onGetConfig('web', (config) => {
    config.mode = 'production';
    return config;
  });
};

export default plugin;