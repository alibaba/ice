import type { Plugin } from '@ice/types';

const PLUGIN_NAME = '@ice/plugin-auth';

const plugin: Plugin = () => ({
  name: PLUGIN_NAME,
  setup: ({ generator }) => {
  // Register API: `import { useAuth, withAuth } from 'ice';`
    generator.addExport({
      specifier: ['withAuth', 'useAuth'],
      source: '@ice/plugin-auth/runtime/Auth',
    });
  },
  runtime: `${PLUGIN_NAME}/esm/runtime`,
});

export default plugin;
