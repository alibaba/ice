import type { Plugin } from '@ice/app/types';

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
        if (type === 'child') {
          const { pkg } = context;
          webpackConfig.output.library = library || pkg.name as string || 'microApp';
          webpackConfig.output.libraryTarget = 'umd';
        }
        return webpackConfig;
      });
      return config;
    });
    if (type === 'child') {
      // Modify basename when render as a child app.
      generator.modifyRenderData((data) => {
        return {
          ...data,
          basename: `(typeof window !== 'undefined' && window.ICESTARK?.basename || ${data.basename})`,
        };
      });
      generator.addEntryCode(() => {
        return `let root;
if (!window.ICESTARK?.root) {
  root = render();
}

// For qiankun lifecycle validation.
export async function bootstrap(props) {
  await app?.icestark?.bootstrap?.(props);
}

export async function mount(props) {
  await app?.icestark?.mount?.(props);
  // Avoid remount when app mount in other micro app framework.
  if (!root) {
    // When app mount in qiankun, do not use props passed by.
    // Props of container if conflict with render node in ice, it may cause node overwritten.
    const runtimeOptions = props.singleSpa ? {} : props;
    root = render({ runtimeOptions });
  }
  await root;
}
export async function unmount(props) {
  root?.then((res) => res.unmount());
  await app?.icestark?.unmount?.(props);
  // Reset root to null when app unmount.
  root = null;
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
