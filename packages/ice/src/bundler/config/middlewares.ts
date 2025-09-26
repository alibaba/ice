import type { Compiler } from '@rspack/core';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { TaskConfig } from 'build-scripts';
import type { RenderMode } from '@ice/runtime';
import type { Config } from '@ice/shared-config/types';
import createMockMiddleware from '../../middlewares/mock/createMiddleware.js';
import createRenderMiddleware from '../../middlewares/renderMiddleware.js';
import createDataLoaderMiddleware from '../../middlewares/dataLoaderMiddleware.js';
import createProxyModuleMiddleware from '../../middlewares/proxyModuleMiddleware.js';
import type { UserConfig } from '../../types/userConfig.js';
import type RouteManifest from '../../utils/routeManifest.js';
import type { GetAppConfig } from '../../types/plugin.js';
import type Generator from '../../service/runtimeGenerator.js';

interface SetupOptions {
  userConfig: UserConfig;
  taskConfig: TaskConfig<Config>;
  routeManifest: RouteManifest;
  getAppConfig: GetAppConfig;
  excuteServerEntry: () => Promise<any>;
  mock: boolean;
  rootDir: string;
  open?: boolean | string;
  dataLoaderCompiler?: Compiler;
  generator?: Generator;
}

function setupMiddlewares(middlewares: Parameters<DevServerConfiguration['setupMiddlewares']>[0], {
  userConfig,
  taskConfig,
  routeManifest,
  getAppConfig,
  excuteServerEntry,
  mock,
  rootDir,
  dataLoaderCompiler,
  generator,
  open,
}: SetupOptions) {
  const { ssr, ssg, routes } = userConfig;
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
  });

  if (dataLoaderCompiler) {
    const dataLoaderMiddleware = createDataLoaderMiddleware(dataLoaderCompiler);
    middlewares.unshift(dataLoaderMiddleware);
  }

  if (routes?.lazyCompile) {
    const proxyModuleMiddleware = createProxyModuleMiddleware({
      manifest: routeManifest.getNestedRoute(),
      rootDir,
      generator,
      defaultPath: typeof open === 'string' ? open : '/',
    });
    // @ts-ignore property of name is exist.
    const staticIndex = middlewares.findIndex(({ name }) => name === 'express-static');
    middlewares.splice(
      staticIndex, 0,
      proxyModuleMiddleware,
    );
  }

  // @ts-ignore property of name is exist.
  const insertIndex = middlewares.findIndex(({ name }) => name === 'serve-index');
  middlewares.splice(
    insertIndex, 0,
    serverRenderMiddleware,
  );

  if (mock) {
    const mockMiddleware = createMockMiddleware({ rootDir, exclude: userConfig?.mock?.exclude });
    middlewares.splice(insertIndex, 0, mockMiddleware);
  }
  return middlewares;
}


export default setupMiddlewares;
