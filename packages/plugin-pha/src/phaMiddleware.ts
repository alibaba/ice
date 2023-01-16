import * as path from 'path';
import type { ServerResponse } from 'http';
import * as fs from 'fs';
import type { ExpressRequestHandler } from 'webpack-dev-server';
import consola from 'consola';
import type { PluginData } from '@ice/app/esm/types';
import { parseManifest, rewriteAppWorker, getAppWorkerUrl, getMultipleManifest, type ParseOptions } from './manifestHelpers.js';
import { getAppWorkerContent, type Options } from './generateManifest.js';
import type { Manifest } from './types.js';

function sendResponse(res: ServerResponse, content: string, mime: string): void {
  res.statusCode = 200;
  res.setHeader('Content-Type', `${mime}; charset=utf-8`);
  res.end(content);
}

const createPHAMiddleware = ({
  rootDir,
  outputDir,
  compileTask,
  parseOptions,
  getAllPlugin,
  getAppConfig,
  getRoutesConfig,
  getDataloaderConfig,
  compiler,
}: Options): ExpressRequestHandler => {
  const phaMiddleware: ExpressRequestHandler = async (req, res, next) => {
    // @ts-ignore
    const requestPath = path.basename(req._parsedUrl.pathname);
    const requestManifest = requestPath.endsWith('manifest.json');

    const requestAppWorker = req.url === '/app-worker.js';
    if (requestManifest || requestAppWorker) {
      // Get serverEntry from middleware of server-compile.
      const { error, serverEntry } = await compileTask();
      if (error) {
        consola.error('Server compile error in plugin-pha middleware.');
        return;
      }
      const [appConfig, routesConfig, dataloaderConfig] = await Promise.all([getAppConfig(['phaManifest']), getRoutesConfig(), getDataloaderConfig()]);
      let manifest: Manifest = appConfig.phaManifest;
      const appWorkerPath = getAppWorkerUrl(manifest, path.join(rootDir, 'src'));
      if (appWorkerPath) {
        // over rewrite appWorker.url to app-worker.js
        manifest = rewriteAppWorker(manifest);
        if (requestAppWorker) {
          const entry = path.join(rootDir, './.ice/appWorker.ts');
          const plugins = getAllPlugin(['keepExports']) as PluginData[];
          let keepExports = ['dataLoader'];
          plugins.forEach(plugin => {
            if (plugin.keepExports) {
              keepExports = keepExports.concat(plugin.keepExports);
            }
          });
          sendResponse(
            res,
            await getAppWorkerContent(compiler, {
              entry: fs.existsSync(entry) ? entry : appWorkerPath,
              outfile: path.join(outputDir, 'app-worker.js'),
            }, {
              swc: {
                keepExports,
                keepPlatform: 'web',
                getRoutePaths: () => {
                  return ['src/pages'];
                },
              },
              preBundle: false,
              externalDependencies: false,
              transformEnv: false,
              enableEnv: true,
              // Redirect import defineDataLoader from @ice/runtime to avoid build plugin side effect code.
              redirectImports: [{
                specifier: ['defineDataLoader'],
                source: '@ice/runtime',
              }],
            }),
            'text/javascript',
          );
          return;
        }
      }
      const phaManifest = await parseManifest(manifest, {
        ...parseOptions,
        routesConfig,
        dataloaderConfig,
        serverEntry: serverEntry,
      } as ParseOptions);
      if (!phaManifest?.tab_bar) {
        const multipleManifest = getMultipleManifest(phaManifest);
        const manifestKey = requestPath.replace('-manifest.json', '').replace(/^\//, '');
        if (multipleManifest[manifestKey]) {
          sendResponse(res, JSON.stringify(multipleManifest[manifestKey]), 'application/json');
          return;
        }
      } else if (requestPath === '/manifest.json') {
        sendResponse(res, JSON.stringify(phaManifest), 'application/json');
        return;
      }
    }
    next();
  };
  return phaMiddleware;
};

export default createPHAMiddleware;