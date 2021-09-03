import type { Plugin } from 'vite';

export const mockPlugin = (mockIgnore: string[]|boolean): Plugin => {
  return {
    name: 'vite-plugin-mock',
    enforce: 'pre',
    configureServer(server) {
      // eslint-disable-next-line global-require
      require('webpack-dev-mock')(server.middlewares, mockIgnore || []);
    }
  };
};
