import * as path from 'path';
import type { Request } from 'webpack-dev-server';
import fse from 'fs-extra';
import consola from 'consola';
import type { ServerContext } from '@ice/runtime';
import type { RouteObject } from 'react-router';
import { ROUTER_MANIFEST } from '../constant.js';

interface Options {
  rootDir: string;
  entry: string;
  outputDir: string;
  documentOnly: boolean;
}

export default async function generateHTML(options: Options) {
  const {
    rootDir,
    entry,
    outputDir,
    documentOnly,
  } = options;

  let serverEntry;

  try {
    serverEntry = await import(entry);
  } catch (err) {
    // make error clearly, notice typeof err === 'string'
    throw new Error(`import ${entry} error: ${err}`);
  }
  // Read the latest routes info.
  const routeManifest = path.join(rootDir, ROUTER_MANIFEST);
  const routes = JSON.parse(fse.readFileSync(routeManifest, 'utf8'));
  const paths = getPaths(routes);

  for (let i = 0, n = paths.length; i < n; i++) {
    const routePath = paths[i];

    const req = {
      url: routePath,
    };

    const serverContext: ServerContext = {
      req: req as Request,
    };
    const { value: html } = await serverEntry.renderToHTML(serverContext, documentOnly);

    const fileName = routePath === '/' ? 'index.html' : `${routePath}.html`;
    if (fse.existsSync(path.join(rootDir, 'public', fileName))) {
      consola.warn(`${fileName} is overwrite by framework, rename file name if it is necessary`);
    }
    const contentPath = path.join(outputDir, fileName);
    await fse.ensureFile(contentPath);
    await fse.writeFile(contentPath, html);
  }
}

/**
 * get all route path
 * @param routes
 * @returns
 */
function getPaths(routes: RouteObject[], parentPath = ''): string[] {
  let pathList = [];

  routes.forEach(route => {
    if (route.children) {
      pathList = pathList.concat(getPaths(route.children, route.path));
    } else {
      pathList.push(path.join('/', parentPath, route.path || ''));
    }
  });

  return pathList;
}
