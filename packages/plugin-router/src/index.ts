import type { FrameworkPlugin } from '@ice/service';

const plugin: FrameworkPlugin = ({ onGetConfig, context }) => {
  const { command } = context;
  // FIXME: types need to return config
  // @ts-expect-error
  onGetConfig('web', (config) => {
    config.mode = 'production';
    return config;
  })
};

export default plugin;