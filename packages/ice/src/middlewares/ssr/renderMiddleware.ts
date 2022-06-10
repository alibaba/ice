import { createRequire } from 'module';
import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';
import type { ServerContext } from '@ice/runtime';
import consola from 'consola';

const require = createRequire(import.meta.url);

interface Options {
  documentOnly: boolean;
}

export default function createRenderMiddleware(options: Options): Middleware {
  const { documentOnly } = options;
  const middleware: ExpressRequestHandler = async function (req, res) {
    // @ts-ignore
    const { serverEntry } = req;
    if (!serverEntry) {
      consola.error('The server entry is not defined.');
      return;
    }
    let serverModule;
    try {
      delete require.cache[serverEntry];
      // timestamp for disable import cache
      const serverEntryWithVersion = `${serverEntry}?version=${new Date().getTime()}`;
      serverModule = await import(serverEntryWithVersion);
    } catch (err) {
      // make error clearly, notice typeof err === 'string'
      consola.error(`import ${serverEntry} error: ${err}`);
      return;
    }
    const requestContext: ServerContext = {
      req,
      res,
    };
    serverModule.renderToResponse(requestContext, documentOnly);
  };

  return {
    name: 'server-render',
    middleware,
  };
}