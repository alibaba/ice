import type { Plugin } from '@ice/app/esm/types';

interface PluginOptions {
  type: 'child' | 'framework';
  library?: string;
}

const PLUGIN_NAME = '@ice/plugin-icestark';
const plugin: Plugin<PluginOptions> = ({ type, library }) => ({
  name: PLUGIN_NAME,
  setup: ({ onGetConfig, context, generator, modifyUserConfig }) => {
    onGetConfig((config) => {
      config.configureWebpack ??= [];
      config.configureWebpack.push((webpackConfig) => {
        if (type !== 'framework') {
          const { pkg } = context;
          webpackConfig.output.library = library || pkg.name as string || 'microApp';
          webpackConfig.output.libraryTarget = 'umd';
        }
        return webpackConfig;
      });
      return config;
    });
    if (type !== 'framework') {
      generator.addEntryCode(() => {
        return `
if (!window.ICESTARK) {
  render();
}
let root;
export function mount(props) {
  if (app?.icestark?.mount) {
    app?.icestark?.mount(props);
  }
  root = render({ runtimeOptions: props });
}
export function unmount(props) {
  root.unmount();
  if (app?.icestark?.unmount) {
    app?.icestark?.unmount(props);
  }
}`;
});
    } else {
      // Plugin icestark do not support ssr yet.
      modifyUserConfig('ssr', false);
      modifyUserConfig('ssg', false);
    }
  },
  runtime: `${PLUGIN_NAME}/esm/runtime/${type === 'framework' ? 'framework' : 'child'}`,
});

export default plugin;
