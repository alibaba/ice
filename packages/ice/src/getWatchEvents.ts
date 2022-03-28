import * as path from 'path';
import consola from 'consola';
import type { WatchEvent } from '@ice/types/esm/plugin.js';
import { generateRoutesInfo } from './routes.js';
import type Generator from './service/runtimeGenerator';

interface Options {
  rootDir: string;
  targetDir: string;
  templateDir: string;
  generator: Generator;
  cache: Map<string, string>;
}

const getWatchEvents = (options: Options): WatchEvent[] => {
  const { rootDir, generator, targetDir, templateDir, cache } = options;
  const watchRoutes: WatchEvent = [
    /src\/pages\/?[\w*-:.$]+$/,
    (eventName: string) => {
      if (eventName === 'add' || eventName === 'unlink') {
        const routesRenderData = generateRoutesInfo(rootDir);
        const stringifiedData = JSON.stringify(routesRenderData);
        if (cache.get('routes') !== stringifiedData) {
          cache.set('routes', stringifiedData);
          consola.debug('[event]', `routes data regenerated: ${stringifiedData}`);
          generator.renderFile(
            path.join(templateDir, 'routes.ts.ejs'),
            path.join(rootDir, targetDir, 'route.ts'),
            routesRenderData,
          );
          generator.renderFile(
            path.join(templateDir, 'route-manifest.json.ejs'),
            path.join(rootDir, targetDir, 'route-manifest.json'),
            routesRenderData,
          );
        }
      }
    },
  ];
  const watchGlobalStyle: WatchEvent = [
    /src\/global.(scss|less|css)/,
    (event: string, filePath: string) => {
      if (event === 'unlink' || event === 'add') {
        consola.debug('[event]', `style '${filePath}': ${event}`);
        // TODO render global style template
      }
    },
  ];

  return [watchRoutes, watchGlobalStyle];
};

export default getWatchEvents;
