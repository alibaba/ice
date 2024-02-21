import type { IncomingMessage } from 'http';
import { parse } from 'url';
import crypto from 'crypto';
import type { Compiler } from '@rspack/core';
import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';

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
    compiler.hooks.done.tap('data-loader-compiler', () => {
      resolve(watching);
    });
  });

  const middleware: ExpressRequestHandler = async function (req: IncomingMessage, res: any, next: () => void) {
    const { method, url } = req;
    if (method !== 'GET') {
      return next();
    }
    const publicPath = compiler.options.output?.publicPath
      ? `${compiler.options.output.publicPath.replace(/\/$/, '')}/`
      : '/';
    const filePath = parse(url || '').pathname;
    const filename = filePath?.startsWith(publicPath) ? filePath.slice(publicPath.length) : filePath.slice(1);
    // Mark sure the compiler is ready.
    await compileTask;
    const buffer = compiler.getAsset(filename);

    if (!buffer) {
      return next();
    }
    const calcEtag = etag(buffer);
		const oldEtag = req.headers['if-none-match'];
    // Only data-loader.js will be matched.
    res.setHeader('Content-Type', 'text/javascript');
    res.setHeader('ETag', calcEtag);
    if (calcEtag === oldEtag) {
			res.status(304).send();
		} else {
			res.send(buffer);
		}
  };
  return {
    name: 'data-loader-middleware',
    middleware,
  };
}
