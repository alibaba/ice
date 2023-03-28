import type { Plugin } from '@ice/app/types';

const PLUGIN_NAME = '@ice/plugin-auth';

const plugin: Plugin = () => ({
  name: PLUGIN_NAME,
  setup: ({ generator }) => {
  // Register API: `import { useAuth, withAuth } from 'ice';`
    generator.addExport({
      specifier: ['withAuth', 'useAuth'],
      source: '@ice/plugin-auth/runtime',
    });

    generator.addRouteTypes({
      specifier: ['ConfigAuth'],
      type: true,
      source: '@ice/plugin-auth/types',
    });
  },
  runtime: `${PLUGIN_NAME}/runtime`,
});

export default plugin;
