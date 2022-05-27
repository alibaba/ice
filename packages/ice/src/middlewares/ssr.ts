import * as path from 'path';
import consola from 'consola';
import type { ServerContext } from '@ice/runtime';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import type { ExpressRequestHandler } from 'webpack-dev-server';
import { SERVER_ENTRY, SERVER_OUTPUT, SERVER_OUTPUT_DIR } from '../constant.js';

interface Options {
  rootDir: string;
  outputDir: string;
  serverCompiler: ServerCompiler;
  documentOnly: boolean;
}

export default function createSSRMiddleware(options: Options) {
  const {
    rootDir,
    outputDir,
    serverCompiler,
    documentOnly,
  } = options;
  const ssrCompiler = async () => {
    const serverEntry = path.join(outputDir, SERVER_OUTPUT);
    await serverCompiler({
      entryPoints: { index: path.join(rootDir, SERVER_ENTRY) },
      outdir: path.join(outputDir, SERVER_OUTPUT_DIR),
      splitting: true,
    });
    // timestamp for disable import cache
    return `${serverEntry}?version=${new Date().getTime()}`;
  };
  let entry: string;
  const middleware: ExpressRequestHandler = async (req, res) => {
    let serverModule;
    try {
      entry = await ssrCompiler();
    } catch (err) {
      consola.error(`fail to compile in ssr middleware: ${err}`);
    }
    try {
      serverModule = await import(entry);
    } catch (err) {
      // make error clearly, notice typeof err === 'string'
      consola.error(`import ${entry} error: ${err}`);
      return;
    }
    const requestContext: ServerContext = {
      req,
      res,
    };
    serverModule.renderToResponse(requestContext, documentOnly);
  };

  return {
    name: 'document-render-server',
    middleware,
  };
}
