import type { Plugin } from '@ice/app/types';

interface PluginOptions {
  activeInDev?: boolean;
}

const PLUGIN_NAME = '@ice/plugin-stream-error';
const plugin: Plugin<PluginOptions> = (options = {}) => ({
  name: PLUGIN_NAME,
  setup: ({ generator, context }) => {
    const { activeInDev } = options;
    const { userConfig } = context;
    if (userConfig.ssr) {
      generator.addEntryCode((originalCode) => {
        return `${originalCode}
if (import.meta.renderer === 'client') {
  window.addEventListener('load', (event) => {
    // _$ServerTimePoints will returned at the end of last stream,
    // if the value is undefined, try to re-render app with CSR.
    if (${activeInDev ? '' : 'process.env.NODE_ENV === \'production\' && '}!window._$ServerTimePoints && window.__ICE_APP_CONTEXT__.renderMode === 'SSR') {
      render({ hydrate: false });
    }
  });
}`;
      });
    }
  },
});

export default plugin;
