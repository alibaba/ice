import path from 'path';
import type { ServerCompiler } from '@ice/types/esm/plugin';
import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';
import consola from 'consola';
import type { UserConfig } from '@ice/types';
import { SERVER_ENTRY, SERVER_OUTPUT_DIR } from '../../constant.js';

interface Options {
  rootDir: string;
  outputDir: string;
  serverCompiler: ServerCompiler;
  server: UserConfig['server'];
  documentOnly: boolean;
}

export default function createCompileMiddleware(options: Options): Middleware {
  const { rootDir, outputDir, serverCompiler, server, documentOnly } = options;
  const middleware: ExpressRequestHandler = async function (req, _, next) {
    try {
      const entryPoint = path.join(rootDir, SERVER_ENTRY);
      const { format } = server;
      const esm = format === 'esm';
      const outJSExtension = esm ? '.mjs' : '.cjs';
      const serverOutputDir = path.join(rootDir, outputDir, SERVER_OUTPUT_DIR);
      const serverEntry = path.join(serverOutputDir, `index${outJSExtension}`);
      await serverCompiler({
        entryPoints: { index: entryPoint },
        outdir: serverOutputDir,
        splitting: esm,
        format,
        platform: esm ? 'browser' : 'node',
        outExtension: { '.js': outJSExtension },
      }, {
        removeExportExprs: documentOnly ? ['default', 'getData'] : [],
      });
      // @ts-ignore
      req.serverEntry = serverEntry;
    } catch (err) {
      consola.error(`fail to compile in ssr middleware: ${err}`);
    }

    next();
  };

  return {
    name: 'server-compile',
    middleware,
  };
}