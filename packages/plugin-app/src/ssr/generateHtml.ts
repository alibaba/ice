import fs from 'fs';
import path from 'path';
import { generateRouteManifest } from '@ice/route-manifest';

export default async function generateHTML(rootDir, outDir, entry: string) {
  const serverEntry = await import(entry);

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

  paths.forEach(async (routePath) => {
    const htmlContent = await serverEntry.render({
      req: {
        url: routePath,
        path: routePath,
      },
    });

    const fileName = routePath === '/' ? 'index.html' : `${routePath}.html`;
    fs.writeFileSync(path.join(outDir, fileName), htmlContent);
  });
}