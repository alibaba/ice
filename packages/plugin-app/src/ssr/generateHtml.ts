import fs from 'fs';
import path from 'path';
import { generateRouteManifest } from '@ice/route-manifest';

export default async function generateHTML(rootDir, outDir, entry: string) {
  const serverEntry = await import(entry);

  // TODO: get route manifest from context
  const routeManifests = generateRouteManifest(rootDir);

  // get all route path
  const paths = [];
  Object.values(routeManifests).forEach(route => {
    if (route.path) {
      paths.push(route.path);
    } else if (route.path == null) {
      paths.push('/');
    }
  });

  for (let i = 0, n = paths.length; i < n; i++) {
    const routePath = paths[i];
    const htmlContent = await serverEntry.render({
      req: {
        url: routePath,
        path: routePath,
      },
    });

    const fileName = routePath === '/' ? 'index.html' : `${routePath}.html`;
    fs.writeFileSync(path.join(outDir, fileName), htmlContent);
  }
}