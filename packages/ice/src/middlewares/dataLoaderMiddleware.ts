import type { IncomingMessage } from 'http';
import { parse } from 'url';
import crypto from 'crypto';
import type { Compiler } from '@rspack/core';
import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';
import { logger } from '../utils/logger.js';

function etag(buf: Buffer) {
  return crypto.createHash('sha256').update(buf).digest('hex');
}

export default function createDataLoaderMiddleware(compiler: Compiler): Middleware {
  const watchOptions = compiler.options.watchOptions || {};
  const watching = compiler.watch(watchOptions, (
    error,
  ) => {
    if (error) {
      console.error(error);
    }
  });
  const compileTask = new Promise((resolve, reject) => {
    compiler.hooks.done.tap('data-loader-compiler', (stats) => {
      const statsJson = stats.toJson({
        all: false,
      });
      if (!stats.hasErrors() || !statsJson?.errors?.length) {
        resolve(watching);
      } else if (statsJson?.errors?.length > 0) {
        logger.error('[data-loader] Compile failed:');
        logger.log(statsJson?.errors);
        reject(false);
      }
    });
  });

  const middleware: ExpressRequestHandler = async function (req: IncomingMessage, res: any, next: () => void) {
    const { method, url } = req;
    if (method !== 'GET') {
      return next();
    }
    const publicPath = compiler.options.output?.publicPath
      // Only support string publicPath config for now
      ? `${(compiler.options.output.publicPath as unknown as string)?.replace(/\/$/, '')}/`
      : '/';
    const filePath = parse(url || '').pathname;
    const filename = filePath?.startsWith(publicPath) ? filePath.slice(publicPath.length) : filePath.slice(1);
    // Mark sure the compiler is ready.
    await compileTask;
    compiler.outputFileSystem.readFile(filename, (err, data) => {
      if (err) {
        return next();
      }
      const calcEtag = etag(data as Buffer);
      const oldEtag = req.headers['if-none-match'];
      // Only data-loader.js will be matched.
      res.setHeader('Content-Type', 'text/javascript');
      res.setHeader('ETag', calcEtag);
      if (calcEtag === oldEtag) {
        res.status(304).send();
      } else {
        res.send(data);
      }
    });
  };
  return {
    name: 'data-loader-middleware',
    middleware,
  };
}
