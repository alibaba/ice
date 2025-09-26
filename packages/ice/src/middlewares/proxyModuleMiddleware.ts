import path from 'path';
import { fileURLToPath } from 'url';
import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';
import type { NestedRouteManifest } from '@ice/route-manifest';
import { getRoutesDefinition } from '../routes.js';
import { RUNTIME_TMP_DIR } from '../constant.js';
import type Generator from '../service/runtimeGenerator.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface Options {
  manifest: NestedRouteManifest[];
  generator: Generator;
  rootDir: string;
  defaultPath: string;
}

export default function createRenderMiddleware(options: Options): Middleware {
  const {
    manifest,
    generator,
    rootDir,
    defaultPath,
  } = options;
  const accessedPath = new Set<string>(defaultPath);

  const middleware: ExpressRequestHandler = async function (req, res, next) {
    if (req.path === '/proxy-module') {
      if (!accessedPath.has(req.query.pathname)) {
        accessedPath.add(req.query.pathname);
        const { routeImports, routeDefinition } = getRoutesDefinition({
          manifest,
          lazy: true,
          compileRoutes: Array.from(accessedPath),
        });
        const templateDir = path.join(__dirname, '../../templates/core/');
        generator.renderFile(
          path.join(templateDir, 'routes.tsx.ejs'),
          path.join(rootDir, RUNTIME_TMP_DIR, 'routes.tsx'),
          { routeImports, routeDefinition },
        );
      }

      res.send('');
    } else {
      next();
    }
  };

  return {
    name: 'proxy-module',
    middleware,
  };
}
