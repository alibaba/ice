import * as path from 'path';
import type { ServerResponse } from 'http';
import type { ExpressRequestHandler } from 'webpack-dev-server';
import { parseManifest, rewriteAppWorker, getAppWorkerUrl, getMultipleManifest, type ParseOptions } from './manifestHelpers.js';
import { getAppWorkerContent, compileEntires, type Options } from './generateManifest.js';
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
  compiler,
}: Options): ExpressRequestHandler => {
  const phaMiddleware: ExpressRequestHandler = async (req, res, next) => {
    // @ts-ignore
    const requestPath = path.basename(req._parsedUrl.pathname);
    const requestManifest = requestPath.endsWith('manifest.json');

    const requestAppWorker = req.url === '/app-worker.js';
    if (requestManifest || requestAppWorker) {
      // Get serverEntry from middleware of server-compile.
      const { serverEntry } = req as any;
      const [manifestEntry, routesConfigEntry] = await compileEntires(compiler, { rootDir, outputDir });
      let manifest: Manifest = (await import(manifestEntry)).default;
      const appWorkerPath = getAppWorkerUrl(manifest, path.join(rootDir, 'src'));
      if (appWorkerPath) {
        // over rewrite appWorker.url to app-worker.js
        manifest = rewriteAppWorker(manifest);
        if (requestAppWorker) {
          sendResponse(
            res,
            await getAppWorkerContent(compiler, {
              entry: appWorkerPath,
              outfile: path.join(outputDir, 'app-worker.js'),
            }),
            'text/javascript',
          );
          return;
        }
      }
      const phaManifest = await parseManifest(manifest, {
        ...parseOptions,
        configEntry: routesConfigEntry,
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