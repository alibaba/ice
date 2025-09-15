import type { Plugin } from '@ice/app/types';

interface PluginOptions {
  type: 'child' | 'framework';
  library?: string | string[];
}

const PLUGIN_NAME = '@ice/plugin-icestark';
const plugin: Plugin<PluginOptions> = ({ type, library }) => ({
  name: PLUGIN_NAME,
  setup: ({ onGetConfig, context, generator, modifyUserConfig }) => {
    const libraryName = library || (context.pkg?.name as string) || 'microApp';
    onGetConfig((config) => {
      config.configureWebpack ??= [];
      config.configureWebpack.push((webpackConfig) => {
        if (type === 'child') {
          webpackConfig.output.library = libraryName;
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
if (!window.ICESTARK?.root && !window.__POWERED_BY_QIANKUN__) {
  root = render();
}
// Set library name
if (typeof window !== 'undefined' && window.ICESTARK) {
  window.ICESTARK.library = ${JSON.stringify(libraryName)};
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
    let runtimeOptions = props;
    if (props.singleSpa) {
      const targetId = app?.default?.app?.rootId || 'ice-container'
      const iceContainer = props.container?.querySelector('#' + targetId);
      if (iceContainer) {
        runtimeOptions = {...props, container: iceContainer };
      } else {
        const ele = document.createElement('div');
        ele.id = targetId;
        props.container.appendChild(ele);
        runtimeOptions = {...props, container: ele };
      }
    }
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
