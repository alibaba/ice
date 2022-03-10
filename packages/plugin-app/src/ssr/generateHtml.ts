import fs from 'fs';
import path from 'path';

export default async function generateHTML(entry: string, outDir, routeManifest) {
  const serverEntry = await import(entry);

  Object.keys(routeManifest).forEach(async (routePath) => {
    const htmlContent = await serverEntry.render({
      req: {
        url: routePath,
      },
    });

    const fileName = routePath === '/' ? 'index.html' : `${routePath}.html`;
    fs.writeFileSync(path.join(outDir, fileName), htmlContent);
  });
}