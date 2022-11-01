import type { Plugin } from 'vite';
import { isBoolean, isUndefined } from 'lodash';
import { all } from 'deepmerge';
import * as history from 'connect-history-api-fallback';

/**
 * Webpack devServer.historyApiFallback
 * 
 * @see https://github.com/vitejs/vite/blob/8733a83d291677b9aff9d7d78797ebb44196596e/packages/vite/src/node/server/index.ts#L433
 */
export const serverHistoryPlugin = (opt: history.Options | boolean): Plugin => {
  if (isBoolean(opt) || isUndefined(opt)) return null;

  return {
    name: 'vite-plugin-server-history',
    enforce: 'pre',
    configureServer({ middlewares: app }) {
      const handler = history(all([opt, {
        rewrites: [{
          from: /\.html/,
          to: (ctx: history.Context) => ctx.parsedUrl.pathname
        }, {
          from: /.*/,
          to: (ctx: history.Context) => ctx.parsedUrl.path
        }]
      }]));

      app.use(handler);
    },
  };
};
