import { createRequire } from 'module';
import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';
import type { ServerContext, RenderMode } from '@ice/runtime';
import matchRoutes from '@ice/runtime/matchRoutes';
import type { TaskConfig } from 'build-scripts';
import type { Config } from '@ice/webpack-config/types';
import type { ExtendsPluginAPI } from '../../types/plugin.js';
import getRouterBasename from '../../utils/getRouterBasename.js';
import dynamicImport from '../../utils/dynamicImport.js';
import warnOnHashRouterEnabled from '../../utils/warnOnHashRouterEnabled.js';
import type { UserConfig } from '../../types/userConfig.js';
import { logger } from '../../utils/logger.js';
import type RouteManifest from '../../utils/routeManifest.js';

const require = createRequire(import.meta.url);

interface Options {
  serverCompileTask: ExtendsPluginAPI['serverCompileTask'];
  getAppConfig: () => Promise<any>;
  userConfig: UserConfig;
  documentOnly?: boolean;
  renderMode?: RenderMode;
  taskConfig?: TaskConfig<Config>;
  routeManifest: RouteManifest;
}

export default function createRenderMiddleware(options: Options): Middleware {
  const {
    documentOnly,
    renderMode,
    serverCompileTask,
    getAppConfig,
    taskConfig,
    userConfig,
    routeManifest,
  } = options;
  const middleware: ExpressRequestHandler = async function (req, res, next) {
    const routes = routeManifest.getNestedRoute();
    const appConfig = (await getAppConfig()).default;
    if (appConfig?.router?.type === 'hash') {
      warnOnHashRouterEnabled(userConfig);
    }
    const basename = getRouterBasename(taskConfig, appConfig);
    const matches = matchRoutes(routes, req.path, basename);
    // When documentOnly is true, it means that the app is CSR and it should return the html.
    if (matches.length || documentOnly) {
      // Wait for the server compilation to finish
      const { serverEntry, error } = await serverCompileTask.get();
      if (error) {
        logger.error('Server compile error in render middleware.');
        return;
      }
      let serverModule;
      try {
        delete require.cache[serverEntry];
        serverModule = await dynamicImport(serverEntry, true);
      } catch (err) {
        // make error clearly, notice typeof err === 'string'
        logger.error(`import ${serverEntry} error: ${err}`);
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
