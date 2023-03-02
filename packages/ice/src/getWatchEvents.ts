import * as path from 'path';
import type { Context } from 'build-scripts';
import type { Config } from '@ice/webpack-config/types';
import type { WatchEvent } from './types/plugin.js';
import { generateRoutesInfo, getRoutesDefination } from './routes.js';
import type Generator from './service/runtimeGenerator';
import getGlobalStyleGlobPattern from './utils/getGlobalStyleGlobPattern.js';
import renderExportsTemplate from './utils/renderExportsTemplate.js';
import { getFileExports } from './service/analyze.js';
import { createLogger } from './utils/logger.js';
import type RouteManifest from './utils/routeManifest.js';

const logger = createLogger('watch-event');

interface Options {
  targetDir: string;
  templateDir: string;
  generator: Generator;
  cache: Map<string, string>;
  ctx: Context<Config>;
  routeManifest: RouteManifest;
  lazyRoutes: boolean;
}

const getWatchEvents = (options: Options): WatchEvent[] => {
  const { generator, targetDir, templateDir, cache, ctx, routeManifest, lazyRoutes } = options;
  const { userConfig: { routes: routesConfig, dataLoader }, configFile, rootDir } = ctx;
  const watchRoutes: WatchEvent = [
    /src\/pages\/?[\w*-:.$]+$/,
    async (eventName: string) => {
      if (eventName === 'add' || eventName === 'unlink' || eventName === 'change') {
        const routesRenderData = await generateRoutesInfo(rootDir, routesConfig);
        const { routeImports, routeDefination } = getRoutesDefination(routesRenderData.routes, lazyRoutes);
        const stringifiedData = JSON.stringify(routesRenderData);
        if (cache.get('routes') !== stringifiedData) {
          cache.set('routes', stringifiedData);
          logger.debug(`routes data regenerated: ${stringifiedData}`);
          if (eventName !== 'change') {
            // Specify the route files to re-render.
            generator.renderFile(
              path.join(templateDir, 'routes.ts.ejs'),
              path.join(rootDir, targetDir, 'routes.ts'),
              { routeImports, routeDefination },
            );
            // Keep generate route manifest for avoid breaking change.
            generator.renderFile(
              path.join(templateDir, 'route-manifest.json.ejs'),
              path.join(rootDir, targetDir, 'route-manifest.json'),
              routesRenderData,
            );
            routeManifest.setRoutes(routesRenderData.routes);
          }
          renderExportsTemplate({
            ...routesRenderData,
            hasExportAppData: !!cache.get('hasExportAppData'),
          }, generator.renderFile, {
            rootDir,
            runtimeDir: targetDir,
            templateDir: path.join(templateDir, '../exports'),
            dataLoader,
          });
        }
      }
    },
  ];

  const watchGlobalStyle: WatchEvent = [
    getGlobalStyleGlobPattern(),
    (event: string, filePath: string) => {
      if (event === 'unlink') {
        logger.log(`style '${filePath}': ${event}`);
        generator.renderFile(
          path.join(templateDir, 'index.ts.ejs'),
          path.join(rootDir, targetDir, 'index.ts'),
          { globalStyle: undefined },
        );
      }
      if (event === 'add') {
        logger.log(`style '${filePath}': ${event}`);
        generator.renderFile(
          path.join(templateDir, 'index.ts.ejs'),
          path.join(rootDir, targetDir, 'index.ts'),
          { globalStyle: `@/${path.basename(filePath)}` },
        );
      }
    },
  ];

  const watchConfigFile: WatchEvent = [
    new RegExp((typeof configFile === 'string' ? [configFile] : configFile).join('|')),
    (event: string, filePath: string) => {
      if (event === 'change') {
        logger.warn(`Found a change in ${path.basename(filePath)}. Restart the dev server to see the changes in effect.`);
      }
    },
  ];

  const watchAppConfigFile: WatchEvent = [
    /src\/app.(js|jsx|ts|tsx)/,
    async (event: string) => {
      if (event === 'change') {
        const hasExportAppData = (await getFileExports({ rootDir, file: 'src/app' })).includes('dataLoader');
        if (hasExportAppData !== !!cache.get('hasExportAppData')) {
          cache.set('hasExportAppData', hasExportAppData ? 'true' : '');
          renderExportsTemplate({
            ...JSON.parse(cache.get('routes')),
            hasExportAppData,
          }, generator.renderFile, {
            rootDir,
            runtimeDir: targetDir,
            templateDir: path.join(templateDir, '../exports'),
            dataLoader,
          });
        }
      }
    },
  ];

  return [watchConfigFile, watchRoutes, watchGlobalStyle, watchAppConfigFile];
};

export default getWatchEvents;
