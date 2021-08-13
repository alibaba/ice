import type { Plugin } from 'vite';
import { isBoolean } from 'lodash';
import { all } from 'deepmerge';
import * as history from 'connect-history-api-fallback';

/**
 * Webpack devServer.historyApiFallback
 * 
 * @see https://github.com/vitejs/vite/blob/8733a83d291677b9aff9d7d78797ebb44196596e/packages/vite/src/node/server/index.ts#L433
 */
export const serverHistoryPlugin = (opt: history.Options | boolean): Plugin => {
  if (isBoolean(opt)) return null;

  return {
    name: 'vite-plugin-server-history',
    enforce: 'pre',
    configureServer({ middlewares: app }) {
      const handler = history(all([opt, {
        rewrites: [{
          from: /.*/,
          to: (ctx: history.Context) => ctx.parsedUrl.pathname
        }]
      }]));

      app.use(handler);
    },
  };
};
