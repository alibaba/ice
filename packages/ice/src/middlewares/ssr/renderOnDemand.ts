import path from 'path';
import type { ExpressRequestHandler, Middleware } from 'webpack-dev-server';
import type { ServerContext, RenderMode } from '@ice/runtime';
// @ts-expect-error FIXME: esm type error
import matchRoutes from '@ice/runtime/matchRoutes';
import type { TaskConfig } from 'build-scripts';
import type { Config } from '@ice/webpack-config/esm/types';
import getRouterBasename from '../../utils/getRouterBasename.js';
import warnOnHashRouterEnabled from '../../utils/warnOnHashRouterEnabled.js';
import type { UserConfig } from '../../types/userConfig.js';
import { logger } from '../../utils/logger.js';
import getRouterManifest from '../../utils/getRouterManifest.js';
import type ServerRunner from '../../service/serverRunner.js';

interface Options {
  rootDir: string;
  getAppConfig: () => Promise<any>;
  userConfig: UserConfig;
  documentOnly?: boolean;
  renderMode?: RenderMode;
  taskConfig?: TaskConfig<Config>;
  serverRunner?: ServerRunner;
}

export default function createRenderMiddleware(options: Options): Middleware {
  const {
    documentOnly,
    renderMode,
    rootDir,
    getAppConfig,
    taskConfig,
    userConfig,
    serverRunner,
  } = options;
  const middleware: ExpressRequestHandler = async function (req, res, next) {
    const routes = getRouterManifest(rootDir);
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
        serverModule = await serverRunner.runFile(path.join(rootDir, '.ice/entry.server.ts'));
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
