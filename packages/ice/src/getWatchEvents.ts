import * as path from 'path';
import consola from 'consola';
import type { ServerCompiler, WatchEvent } from '@ice/types/esm/plugin.js';
import type { Context } from 'build-scripts';
import type { Config } from '@ice/types';
import { generateRoutesInfo } from './routes.js';
import type Generator from './service/runtimeGenerator';
import { compileAppConfig } from './analyzeRuntime.js';
import getGlobalStyleGlobPattern from './utils/getGlobalStyleGlobPattern.js';
import renderExportsTemplate from './utils/renderExportsTemplate.js';
import { getFileExports } from './service/analyze.js';

interface Options {
  targetDir: string;
  templateDir: string;
  generator: Generator;
  cache: Map<string, string>;
  ctx: Context<Config>;
  serverCompiler: ServerCompiler;
}

const getWatchEvents = (options: Options): WatchEvent[] => {
  const { serverCompiler, generator, targetDir, templateDir, cache, ctx } = options;
  const { userConfig: { routes: routesConfig }, configFile, rootDir } = ctx;
  const watchRoutes: WatchEvent = [
    /src\/pages\/?[\w*-:.$]+$/,
    async (eventName: string) => {
      if (eventName === 'add' || eventName === 'unlink') {
        const routesRenderData = await generateRoutesInfo(rootDir, routesConfig);
        const stringifiedData = JSON.stringify(routesRenderData);
        if (cache.get('routes') !== stringifiedData) {
          cache.set('routes', stringifiedData);
          consola.debug('[event]', `routes data regenerated: ${stringifiedData}`);
          // Specify the route files to re-render.
          generator.renderFile(
            path.join(templateDir, 'routes.ts.ejs'),
            path.join(rootDir, targetDir, 'routes.ts'),
            routesRenderData,
          );
          generator.renderFile(
            path.join(templateDir, 'route-manifest.json.ejs'),
            path.join(rootDir, targetDir, 'route-manifest.json'),
            routesRenderData,
          );
          renderExportsTemplate({
            ...routesRenderData,
            hasExportAppData: !!cache.get('hasExportAppData'),
          }, generator.renderFile, {
            rootDir,
            runtimeDir: targetDir,
            templateDir: path.join(templateDir, '../exports'),
          });
        }
      }
    },
  ];

  const watchGlobalStyle: WatchEvent = [
    getGlobalStyleGlobPattern(),
    (event: string, filePath: string) => {
      if (event === 'unlink') {
        consola.log('[event]', `style '${filePath}': ${event}`);
        generator.renderFile(
          path.join(templateDir, 'index.ts.ejs'),
          path.join(rootDir, targetDir, 'index.ts'),
          { globalStyle: undefined },
        );
      }
      if (event === 'add') {
        consola.log('[event]', `style '${filePath}': ${event}`);
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
        consola.warn(`Found a change in ${path.basename(filePath)}. Restart the dev server to see the changes in effect.`);
      }
    },
  ];

  const watchAppConfigFile: WatchEvent = [
    /src\/app.(js|jsx|ts|tsx)/,
    async (event: string) => {
      if (event === 'change') {
        const hasExportAppData = (await getFileExports({ rootDir, file: 'src/app' })).includes('getAppData');
        if (hasExportAppData !== !!cache.get('hasExportAppData')) {
          cache.set('hasExportAppData', hasExportAppData ? 'true' : '');
          renderExportsTemplate({
            ...JSON.parse(cache.get('routes')),
            hasExportAppData,
          }, generator.renderFile, {
            rootDir,
            runtimeDir: targetDir,
            templateDir: path.join(templateDir, '../exports'),
          });
        }
        consola.debug('[event]', 'Compile app config.');
        await compileAppConfig({ rootDir, serverCompiler });
      }
    },
  ];

  return [watchConfigFile, watchRoutes, watchGlobalStyle, watchAppConfigFile];
};

export default getWatchEvents;
