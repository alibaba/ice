import * as path from 'path';
import type { IncomingMessage } from 'http';
import fse from 'fs-extra';
import type { ServerContext } from '@ice/runtime';
import type { RouteObject } from 'react-router';

interface Options {
  entry: string;
  routeManifest: string;
  outDir: string;
  ssg: boolean;
  ssr: boolean;
}

export default async function generateHTML(options: Options) {
  const {
    entry,
    routeManifest,
    outDir,
    ssg,
    ssr,
  } = options;

  let serverEntry;

  try {
    serverEntry = await import(entry);
  } catch (err) {
    // make error clearly, notice typeof err === 'string'
    throw new Error(`import ${entry} error: ${err}`);
  }

  const routes = JSON.parse(fse.readFileSync(routeManifest, 'utf8'));
  const paths = getPaths(routes);

  for (let i = 0, n = paths.length; i < n; i++) {
    const routePath = paths[i];

    const req = {
      url: routePath,
    };

    const serverContext: ServerContext = {
      req: req as IncomingMessage,
    };

    const documentOnly = !(ssg || ssr);
    const { value: html } = await serverEntry.renderToHTML(serverContext, documentOnly);

    const fileName = routePath === '/' ? 'index.html' : `${routePath}.html`;
    const contentPath = path.join(outDir, fileName);
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
