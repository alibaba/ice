import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';
import type { ServerContext, RenderMode } from '@ice/runtime';
// @ts-expect-error FIXME: esm type error
import matchRoutes from '@ice/runtime/matchRoutes';
import type { TaskConfig } from 'build-scripts';
import type { Config } from '@ice/webpack-config/types';
import getRouterBasename from '../utils/getRouterBasename.js';
import warnOnHashRouterEnabled from '../utils/warnOnHashRouterEnabled.js';
import type { UserConfig } from '../types/userConfig.js';
import { logger } from '../utils/logger.js';
import type ServerRunner from '../service/ServerRunner.js';
import type RouteManifest from '../utils/routeManifest.js';

interface Options {
  routeManifest: RouteManifest;
  getAppConfig: () => Promise<any>;
  userConfig: UserConfig;
  documentOnly?: boolean;
  renderMode?: RenderMode;
  taskConfig?: TaskConfig<Config>;
  serverRunner?: ServerRunner;
}

export default function createOnDemandRenderMiddleware(options: Options): Middleware {
  const {
    documentOnly,
    renderMode,
    getAppConfig,
    taskConfig,
    userConfig,
    serverRunner,
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
      let serverModule;
      try {
        serverModule = await serverRunner.run('.ice/entry.server.ts');
      } catch (err) {
        logger.error(`server entry error: ${err}`);
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
    name: 'on-demand-render',
    middleware,
  };
}
