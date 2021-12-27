import type { Plugin } from 'vite';

export const externalsPlugin = (externals: Record<string, string> = {}): Plugin => {
  return {
    name: 'vite-plugin-resolve-externals',
    resolveId(id) {
      if (externals[id]) {
        return id;
      }
    },
    load(id) {
      if (externals[id]) {
        return `const externals = window.${externals[id]};export default externals`;
      }
    },
  };
};
