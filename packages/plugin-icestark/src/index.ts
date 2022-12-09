import type { Plugin } from '@ice/app/esm/types';

interface PluginOptions {
  type: 'child' | 'framework';
  library?: string;
}

const PLUGIN_NAME = '@ice/plugin-icestark';
const plugin: Plugin<PluginOptions> = ({ type, library }) => ({
  name: PLUGIN_NAME,
  setup: ({ onGetConfig, context, generator }) => {
    if (type === 'framework') {

    } else {
      generator.addEntryCode(() => {
        return `
if (!window.ICESTARK) {
  render();
}
let root;
export mount(props) {
  if (app?.icestark?.mount) {
    app?.icestark?.mount(props);
  }
  root = render({ runtimeOptions: props });
}
export unmount(props) {
  root.unmount();
  if (app?.icestark?.unmount) {
    app?.icestark?.unmount(props);
  }
}`;
});
      onGetConfig((config) => {
        config.configureWebpack ??= [];
        config.configureWebpack.push((webpackConfig) => {
          const { pkg } = context;
          webpackConfig.output.library = library || pkg.name as string || 'microApp';
          webpackConfig.output.libraryTarget = 'umd';
          return webpackConfig;
        });
        return config;
      });
    }
  },
  runtime: `${PLUGIN_NAME}/esm/runtime/${type === 'framework' ? 'framework' : 'child'}`,
});

export default plugin;
