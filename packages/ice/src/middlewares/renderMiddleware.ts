import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';
import type { ServerContext, RenderMode } from '@ice/runtime';
import matchRoutes from '@ice/runtime/matchRoutes';
import type { TaskConfig } from 'build-scripts';
import type { Config } from '@ice/shared-config/types';
import type { ExtendsPluginAPI } from '../types/plugin.js';
import getRouterBasename from '../utils/getRouterBasename.js';
import warnOnHashRouterEnabled from '../utils/warnOnHashRouterEnabled.js';
import type { UserConfig } from '../types/userConfig.js';
import type RouteManifest from '../utils/routeManifest.js';

interface Options {
  excuteServerEntry: ExtendsPluginAPI['excuteServerEntry'];
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
    excuteServerEntry,
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
    const isStaticResources = /\.(js|mjs|map|json|png|jpg|jpeg|gif|svg|eot|woff2|ttf)$/;
    // When documentOnly is true, it means that the app is CSR and it should return the html.
    if ((matches.length || documentOnly) &&
      // Ignore static resources.
      !isStaticResources.test(req.path)) {
      const serverModule = await excuteServerEntry();
      if (serverModule) {
        const requestContext: ServerContext = {
          req,
          res,
        };
        res.setHeader('fcc-enable', 'true');
        serverModule.renderToResponse(requestContext, {
          renderMode,
          documentOnly,
        });
      }
    } else {
      next();
    }
  };

  return {
    name: 'server-render',
    middleware,
  };
}
