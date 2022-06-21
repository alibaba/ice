import * as path from 'path';
import * as fs from 'fs';
import { fileURLToPath } from 'url';
import type { ServerResponse } from 'http';
import type { Plugin } from '@ice/types';
import type { ExpressRequestHandler } from 'webpack-dev-server';
import { parseManifest, rewriteAppWorker, getAppWorkerUrl } from './manifestHelpers.js';
import type { Manifest } from './types.js';

type Compiler = (options: {
  entry: string;
  outfile: string;
  timestamp?: boolean;
  removeExportExprs?: string[];
}) => Promise<string>;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function sendResponse(res: ServerResponse, content: string, mime: string): void {
  res.statusCode = 200;
  res.setHeader('Content-Type', `${mime}; charset=utf-8`);
  res.end(content);
}

const plugin: Plugin = ({ onGetConfig, onHook, context, generator }) => {
  const { command, rootDir, userConfig } = context;
  let compiler: Compiler;
  let manifestOutfile: string;
  let routesConfigOutfile: string;
  let appWorkerOutfile: string;
  let phaManifestJson: string;

  const phaManifestPath = path.join(rootDir, '.ice/phaManifest.ts');
  const routesConfigPath = path.join(rootDir, '.ice/routes-config.ts');
  generator.addRenderFile(path.join(__dirname, '../template/manifest.ts'), path.join(rootDir, '.ice/phaManifest.ts'));
  // get server compiler by hooks
  onHook(`before.${command as 'start' | 'build'}.run`, async ({ serverCompiler, taskConfigs }) => {
    const { outputDir } = taskConfigs.find(({ name }) => name === 'web').config;
    // declare outfile after getting final task config
    manifestOutfile = path.join(outputDir, 'pha-manifest.mjs');
    routesConfigOutfile = path.join(outputDir, 'routes-config.mjs');
    appWorkerOutfile = path.join(outputDir, 'app-work.js');
    phaManifestJson = path.join(outputDir, 'pha-manifest.json');

    compiler = async (options) => {
      const { entry, outfile, removeExportExprs, timestamp = true } = options;
      await serverCompiler({
        entryPoints: [entry],
        format: 'esm',
        outfile,
        inject: [],
      }, removeExportExprs ? { removeExportExprs } : null);
      return `${outfile}${timestamp ? `?version=${new Date().getTime()}` : ''}`;
    };
  });

  // compile task before parse pha manifest
  async function compileEntires() {
    return await Promise.all([
      compiler({
        entry: phaManifestPath,
        outfile: manifestOutfile,
      }),
      compiler({
        entry: routesConfigPath,
        outfile: routesConfigOutfile,
        removeExportExprs: ['default', 'getData'],
      }),
    ]);
  }

  async function getAppWorkerContent(entry: string, outfile: string): Promise<string> {
    const appWorkerFile = await compiler({
      entry,
      outfile,
      timestamp: false,
    });
    return fs.readFileSync(appWorkerFile, 'utf-8');
  }

  onHook('after.build.compile', async ({ serverEntry }) => {
    const [manifestEntry, routesConfigEntry] = await compileEntires();
    let manifest: Manifest = (await import(manifestEntry)).default;
    const appWorkerPath = getAppWorkerUrl(manifest, path.join(rootDir, 'src'));
    if (appWorkerPath) {
      manifest = rewriteAppWorker(manifest);
      await getAppWorkerContent(appWorkerPath, appWorkerOutfile);
    }
    const phaManifest = await parseManifest(manifest, {
      publicPath: userConfig.publicPath || '/',
      configEntry: routesConfigEntry,
      serverEntry,
    });
    fs.writeFileSync(phaManifestJson, JSON.stringify(phaManifest), 'utf-8');
  });

  onGetConfig('web', (config) => {
    const customMiddlewares = config.middlewares;
    config.middlewares = (middlewares, devServer) => {
      const currentMiddlewares = customMiddlewares ? customMiddlewares(middlewares, devServer) : middlewares;
      const insertIndex = currentMiddlewares.findIndex(({ name }) => name === 'server-compile');
      const phaMiddleware: ExpressRequestHandler = async (req, res, next) => {
        const requestManifest = req.url === '/pha-manifest.json';
        const requestAppWorker = req.url === '/app-worker.js';
        if (requestManifest || requestAppWorker) {
          // get serverEntry from middleware of server-compile
          const { serverEntry } = req as any;
          const [manifestEntry, routesConfigEntry] = await compileEntires();
          let manifest: Manifest = (await import(manifestEntry)).default;
          const appWorkerPath = getAppWorkerUrl(manifest, path.join(rootDir, 'src'));
          if (appWorkerPath) {
            // over rewrite appWorker.url to app-worker.js
            manifest = rewriteAppWorker(manifest);
            if (requestAppWorker) {
              sendResponse(res, await getAppWorkerContent(appWorkerPath, appWorkerOutfile), 'text/javascript');
              return;
            }
          }
          const phaManifest = await parseManifest(manifest, {
            publicPath: userConfig.devPublicPath || '/',
            configEntry: routesConfigEntry,
            serverEntry: serverEntry,
          });
          sendResponse(res, JSON.stringify(phaManifest), 'application/json');
        } else {
          next();
        }
      };
      // add pha middleware after server-compile
      middlewares.splice(insertIndex + 1, 0, {
        name: 'pha-manifest',
        middleware: phaMiddleware,
      });
      return currentMiddlewares;
    };
    return config;
  });
};

export default () => ({
  name: '@ice/plugin-pha',
  plugin,
});