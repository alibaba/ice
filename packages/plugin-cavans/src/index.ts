import type { Plugin } from '@ice/app/types';

const PLUGIN_NAME = '@ice/plugin-canvas';

const plugin: Plugin = () => ({
  name: PLUGIN_NAME,
  setup: async ({ generator }) => {
    generator.addExport({
      source: '@ice/cache-canvas',
      specifier: ['CacheCanvas'],
    });
  },
});

export default plugin;
