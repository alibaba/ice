import type { Plugin } from '@ice/app/types';

const PLUGIN_NAME = '@ice/plugin-stream-error';
const plugin: Plugin<{}> = () => ({
  name: PLUGIN_NAME,
  setup: ({ generator, context }) => {
    const { userConfig } = context;
    if (userConfig.ssr) {
      generator.addEntryCode((originalCode) => {
        return `${originalCode}
if (import.meta.renderer === 'client') {
  window.addEventListener('load', (event) => {
    // _$ServerTimePoints will returned at the end of last stream,
    // if the value is undefined, try to re-render app with CSR.
    if (!window._$ServerTimePoints && window.__ICE_APP_CONTEXT__.renderMode === 'SSR') {
      render({ hydrate: false });
    }
  });
}`;
      });
    }
  },
});

export default plugin;
