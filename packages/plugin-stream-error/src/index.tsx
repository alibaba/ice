import type { Plugin } from '@ice/app/types';

interface PluginOptions {
  activeInDev?: boolean;
  rootId?: string;
}

const PLUGIN_NAME = '@ice/plugin-stream-error';
const plugin: Plugin<PluginOptions> = (options = {
  rootId: 'root',
}) => ({
  name: PLUGIN_NAME,
  setup: ({ generator, context }) => {
    const { activeInDev, rootId } = options;
    const { userConfig } = context;
    if (userConfig.ssr) {
      generator.addEntryCode((originalCode) => {
        return `${originalCode}
if (import.meta.renderer === 'client') {
  function froceRerender() {
    // _$ServerTimePoints will returned at the end of last stream,
    // if the value is undefined, try to re-render app with CSR.
    if (${activeInDev ? '' : 'process.env.NODE_ENV === \'production\' && '}!window._$ServerTimePoints && window.__ICE_APP_CONTEXT__.renderMode === 'SSR') {
      const root = document.getElementById('${rootId}');
      if (root) {
        root.innerHTML = '';
      }
      window.__ICE_APP_CONTEXT__.renderMode = 'CSR';
      render({ hydrate: false });
    }
  }
  if (document.readyState === 'complete') {
    froceRerender();
  } else {
    window.addEventListener('load', froceRerender);
  }
}`;
      });
    }
  },
});

export default plugin;
