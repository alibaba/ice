import * as path from 'path';
import { createRequire } from 'module';
import consola from 'consola';
import type { ServerContext } from '@ice/runtime';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import type { ExpressRequestHandler } from 'webpack-dev-server';
import type { Config } from '@ice/types';
import type { Context } from 'build-scripts';
import { SERVER_ENTRY, SERVER_OUTPUT_DIR } from '../constant.js';

const require = createRequire(import.meta.url);

interface Options {
  rootDir: string;
  outputDir: string;
  serverCompiler: ServerCompiler;
  userConfig: Context<Config>['userConfig'];
}

export default function createSSRMiddleware(options: Options) {
  const {
    rootDir,
    outputDir,
    serverCompiler,
    userConfig,
  } = options;
  const { ssr, ssg, server } = userConfig;
  const documentOnly = !ssr && !ssg;

  const ssrCompiler = async () => {
    const entryPoint = path.join(rootDir, SERVER_ENTRY);
    const format = server?.format;
    const esm = format === 'esm';
    const outJSExtension = esm ? '.mjs' : '.cjs';
    const serverEntry = path.join(outputDir, SERVER_OUTPUT_DIR, `index${outJSExtension}`);
    await serverCompiler({
      entryPoints: { index: entryPoint },
      outdir: path.join(outputDir, SERVER_OUTPUT_DIR),
      splitting: esm,
      format,
      platform: esm ? 'browser' : 'node',
      outExtension: { '.js': outJSExtension },
    });

    return serverEntry;
  };
  let serverEntry: string;
  const middleware: ExpressRequestHandler = async (req, res) => {
    let serverModule;
    try {
      serverEntry = await ssrCompiler();
    } catch (err) {
      consola.error(`fail to compile in ssr middleware: ${err}`);
    }
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
    name: 'document-render-server',
    middleware,
  };
}