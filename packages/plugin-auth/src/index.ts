import path from 'path';
import { fileURLToPath } from 'url';
import type { Plugin } from '@ice/types';

const plugin: Plugin = () => ({
  name: '@ice/plugin-auth',
  setup: ({ generator }) => {
  // Register API: `import { useAuth, withAuth } from 'ice';`
    generator.addExport({
      specifier: ['withAuth', 'useAuth'],
      source: '@ice/plugin-auth/runtime/Auth',
    });
  },
  runtime: path.join(path.dirname(fileURLToPath(import.meta.url)), 'runtime', 'index.js'),
});

export default plugin;
