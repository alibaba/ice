import type { Plugin } from 'vite';

const vitePluginErrorOverlay = (): Plugin => {
  return {
    name: 'vite-plugin-error-overlay',
    config: (config, env) => {
    },
    transformIndexHtml() {
    },
  };
};

export default vitePluginErrorOverlay;
