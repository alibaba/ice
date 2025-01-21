import path from 'path';
import fse from 'fs-extra';
import type { RouteItem } from '@ice/runtime';
import matchRoutes from '@ice/runtime/matchRoutes';
import { logger } from './logger.js';
import type RouteManifest from './routeManifest.js';

function getRouteAsset(routeManifest: RouteItem[], routePath: string): string {
  const matches = matchRoutes(routeManifest, routePath);
  // Ingnore layout assets and return leaf route.
  const routeMatch = matches[matches.length - 1];
  const componentName = routeMatch?.route?.componentName;
  return componentName ? `p_${componentName}.js` : '';
}

function injectInitialEntry(routeManifest: RouteManifest, outputDir: string) {
  // Read the latest routes info.
  const routePaths = routeManifest.getFlattenRoute();
  const routeItems = routeManifest.getNestedRoute();
  routePaths.forEach((routePath) => {
    const routeAsset = getRouteAsset(routeItems as unknown as RouteItem[], routePath);
    // Inject `initialPath` when router type is memory.
    const routeAssetPath = path.join(outputDir, 'js', routeAsset);
    if (fse.existsSync(routeAssetPath)) {
      fse.writeFileSync(routeAssetPath,
        `window.__ICE_APP_CONTEXT__=Object.assign(window.__ICE_APP_CONTEXT__||{}, {routePath: '${routePath}'});${
          fse.readFileSync(routeAssetPath, 'utf-8')}`);
    } else {
      logger.warn(`Can not find ${routeAssetPath} when inject initial path.`);
    }
  });
}

export default injectInitialEntry;

