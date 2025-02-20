import type { Compiler, MultiCompiler } from '@rspack/core';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { TaskConfig } from 'build-scripts';
import type { RenderMode } from '@ice/runtime';
import type { Config } from '@ice/shared-config/types';
import type webpack from '@ice/bundles/compiled/webpack/index.js';
import webpackDevMiddleware from '@ice/bundles/compiled/webpack-dev-middleware/index.js';
import createMockMiddleware from '../../middlewares/mock/createMiddleware.js';
import createRenderMiddleware from '../../middlewares/renderMiddleware.js';
import createDataLoaderMiddleware from '../../middlewares/dataLoaderMiddleware.js';
import type { UserConfig } from '../../types/userConfig.js';
import type RouteManifest from '../../utils/routeManifest.js';
import type { GetAppConfig } from '../../types/plugin.js';

export type ICECompiler = Compiler | MultiCompiler | webpack.Compiler | webpack.MultiCompiler;

interface SetupOptions {
  userConfig: UserConfig;
  taskConfig: TaskConfig<Config>;
  routeManifest: RouteManifest;
  getAppConfig: GetAppConfig;
  excuteServerEntry: (name?: string) => Promise<any>;
  mock: boolean;
  rootDir: string;
  dataLoaderCompiler?: Compiler;
  compiler?: ICECompiler;
  allTaskConfigs?: TaskConfig<Config>[];
}

function setupMiddlewares(
  middlewares: Parameters<DevServerConfiguration['setupMiddlewares']>[0],
  {
    userConfig,
    taskConfig,
    routeManifest,
    getAppConfig,
    excuteServerEntry,
    mock,
    rootDir,
    dataLoaderCompiler,
    compiler,
    allTaskConfigs,
  }: SetupOptions,
) {
  const { ssr, ssg } = userConfig;
  let renderMode: RenderMode;
  // If ssr is set to true, use ssr for preview.
  if (ssr) {
    renderMode = 'SSR';
  } else if (ssg) {
    renderMode = 'SSG';
  }
  // Both ssr and ssg, should render the whole page in dev mode.
  const documentOnly = !ssr && !ssg;
  const serverRenderMiddleware = createRenderMiddleware({
    documentOnly,
    renderMode,
    getAppConfig,
    taskConfig,
    userConfig,
    routeManifest,
    excuteServerEntry,
    allTaskConfigs,
  });

  // @ts-ignore property of name is exist.
  const multiCompilers = (compiler as webpack.MultiCompiler).compilers;
  if (Array.isArray(multiCompilers) && multiCompilers.length > 1) {
    // @ts-ignore property of name is exist.
    middlewares = middlewares.filter(({ name }) => name !== 'webpack-dev-middleware');

    multiCompilers.forEach((comp) => {
      const devMiddleware = {
        name: 'webpack-dev-middleware',
        // @ts-ignore property of name is exist.
        middleware: webpackDevMiddleware(comp, {
          publicPath: comp.options.output.publicPath,
          writeToDisk: true,
        }),
      };

      // @ts-ignore property of name is exist.
      const insertIndex = middlewares.findIndex(({ name }) => name === 'express-static');
      middlewares.splice(insertIndex, 0, devMiddleware);
    });
  }

  if (dataLoaderCompiler) {
    const dataLoaderMiddleware = createDataLoaderMiddleware(dataLoaderCompiler);
    middlewares.unshift(dataLoaderMiddleware);
  }

  // @ts-ignore property of name is exist.
  const insertIndex = middlewares.findIndex(({ name }) => name === 'serve-index');
  middlewares.splice(insertIndex, 0, serverRenderMiddleware);

  if (mock) {
    const mockMiddleware = createMockMiddleware({ rootDir, exclude: userConfig?.mock?.exclude });
    middlewares.splice(insertIndex, 0, mockMiddleware);
  }
  return middlewares;
}

export default setupMiddlewares;
