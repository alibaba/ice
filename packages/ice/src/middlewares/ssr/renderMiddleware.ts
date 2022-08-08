import { createRequire } from 'module';
import fse from 'fs-extra';
import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';
import type { ServerContext, RenderMode } from '@ice/runtime';
import consola from 'consola';
// @ts-expect-error FIXME: esm type error
import matchRoutes from '@ice/runtime/matchRoutes';
import type { ExtendsPluginAPI } from '@ice/types/esm/plugin.js';
import type { TaskConfig } from 'build-scripts';
import type { Config } from '@ice/types';
import getRouterBasename from '../../utils/getRouterBasename.js';

const require = createRequire(import.meta.url);

interface Options {
  serverCompileTask: ExtendsPluginAPI['serverCompileTask'];
  routeManifestPath: string;
  documentOnly?: boolean;
  renderMode?: RenderMode;
  taskConfig?: TaskConfig<Config>;
  getAppConfig: () => Promise<any>;
}

export default function createRenderMiddleware(options: Options): Middleware {
  const { documentOnly, renderMode, serverCompileTask, routeManifestPath, getAppConfig, taskConfig } = options;
  const middleware: ExpressRequestHandler = async function (req, res, next) {
    const routes = JSON.parse(fse.readFileSync(routeManifestPath, 'utf-8'));
    const basename = getRouterBasename(taskConfig, (await getAppConfig()).default);
    const matches = matchRoutes(routes, req.path, basename);
    if (matches.length) {
      // Wait for the server compilation to finish
      const { serverEntry } = await serverCompileTask.get();

      let serverModule;
      try {
        delete require.cache[serverEntry];
        // timestamp for disable import cache
        const serverEntryWithVersion = `${serverEntry}?version=${new Date().getTime()}`;
        serverModule = await import(serverEntryWithVersion);
      } catch (err) {
        // make error clearly, notice typeof err === 'string'
        consola.error(`import ${serverEntry} error: ${err}`);
        return;
      }
      const requestContext: ServerContext = {
        req,
        res,
      };
      serverModule.renderToResponse(requestContext, {
        renderMode,
        documentOnly,
      });
    } else {
      next();
    }
  };

  return {
    name: 'server-render',
    middleware,
  };
}