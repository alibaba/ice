import * as path from 'path';
import type { ServerResponse } from 'http';
import * as fs from 'fs';
import type { ExpressRequestHandler } from 'webpack-dev-server';
import { getCompilerConfig } from './constants.js';
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
  parseOptions,
  getAllPlugin,
  getAppConfig,
  getRoutesConfig,
  getDataloaderConfig,
  compiler,
  logger,
}: Options): ExpressRequestHandler => {
  const phaMiddleware: ExpressRequestHandler = async (req, res, next) => {
    // @ts-ignore
    const requestPath = path.basename(req._parsedUrl.pathname);
    const requestManifest = requestPath.endsWith('manifest.json');

    const requestAppWorker = req.url === '/app-worker.js';
    if (requestManifest || requestAppWorker) {
      const [appConfig, routesConfig] = await Promise.all([getAppConfig(['phaManifest']), getRoutesConfig()]);

      let dataloaderConfig;
      try {
        // dataLoader may have side effect code.
        dataloaderConfig = await getDataloaderConfig();
      } catch (err) {
        logger.briefError('GetDataloaderConfig failed.');
        logger.debug(err);
      }

      let manifest: Manifest = appConfig.phaManifest;
      const appWorkerPath = getAppWorkerUrl(manifest, path.join(rootDir, 'src'));
      if (appWorkerPath) {
        // over rewrite appWorker.url to app-worker.js
        manifest = rewriteAppWorker(manifest);
        if (requestAppWorker) {
          const entry = path.join(rootDir, './.ice/appWorker.ts');
          sendResponse(
            res,
            await getAppWorkerContent(compiler, {
              entry: fs.existsSync(entry) ? entry : appWorkerPath,
              outfile: path.join(outputDir, 'app-worker.js'),
            }, getCompilerConfig({
              getAllPlugin,
            })),
            'text/javascript',
          );
          return;
        }
      }
      const phaManifest = await parseManifest(manifest, {
        ...parseOptions,
        routesConfig,
        dataloaderConfig,
      } as ParseOptions);
      if (!phaManifest?.tab_bar) {
        const multipleManifest = getMultipleManifest(phaManifest);
        const manifestKey = requestPath.replace('-manifest.json', '').replace(/^\//, '');
        if (multipleManifest[manifestKey]) {
          sendResponse(res, JSON.stringify(multipleManifest[manifestKey]), 'application/json');
          return;
        }
      } else if (requestPath === 'manifest.json') {
        sendResponse(res, JSON.stringify(phaManifest), 'application/json');
        return;
      }
    }
    next();
  };
  return phaMiddleware;
};

export default createPHAMiddleware;
