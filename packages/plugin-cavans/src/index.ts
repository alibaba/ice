import type { Plugin } from '@ice/app/types';

const PLUGIN_NAME = '@ice/plugin-canvas';

const plugin: Plugin = () => ({
  name: PLUGIN_NAME,
  setup: async ({ generator }) => {
    generator.addExport({
      source: '@ice/plugin-canvas/CacheCanvas',
      specifier: ['CacheCanvas'],
    });
  },
});

export default plugin;
