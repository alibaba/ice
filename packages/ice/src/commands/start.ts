import * as path from 'path';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Context, TaskConfig } from 'build-scripts';
import type { StatsError, Compiler, Configuration } from 'webpack';
import type { Config } from '@ice/webpack-config/esm/types';
import type { AppConfig, RenderMode } from '@ice/runtime';
import type ora from '@ice/bundles/compiled/ora/index.js';

import consola from 'consola';
import WebpackDevServer from '@ice/bundles/compiled/webpack-dev-server/lib/Server.js';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import { getWebpackConfig } from '@ice/webpack-config';
import type { ExtendsPluginAPI, ServerCompiler, GetAppConfig, GetRoutesConfig } from '../types';
import { ROUTER_MANIFEST, RUNTIME_TMP_DIR, WEB } from '../constant.js';
import webpackCompiler from '../service/webpackCompiler.js';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import prepareURLs from '../utils/prepareURLs.js';
import createRenderMiddleware from '../middlewares/ssr/renderMiddleware.js';
import createMockMiddleware from '../middlewares/mock/createMiddleware.js';
import getRouterBasename from '../utils/getRouterBasename.js';
import emptyDir from '../utils/emptyDir.js';

const { merge } = lodash;

const start = async (
  context: Context<Config, ExtendsPluginAPI>,
  options: {
    taskConfigs: TaskConfig<Config>[];
    serverCompiler: ServerCompiler;
    appConfig: AppConfig;
    devPath: string;
    spinner: ora.Ora;
    getAppConfig: GetAppConfig;
    getRoutesConfig: GetRoutesConfig;
    userConfigHash: string;
  },
) => {
  const {
    taskConfigs,
    serverCompiler,
    appConfig,
    devPath,
    spinner,
    getAppConfig,
    getRoutesConfig,
    userConfigHash,
  } = options;
  const { commandArgs, rootDir } = context;
  const { platform = WEB } = commandArgs;
  const webpackConfigs = taskConfigs.map(({ config }) => getWebpackConfig({
    config,
    rootDir,
    // @ts-expect-error fix type error of compiled webpack
    webpack,
    runtimeTmpDir: RUNTIME_TMP_DIR,
    userConfigHash,
  }));

  const hooksAPI = {
    serverCompiler,
    getAppConfig,
    getRoutesConfig,
  };

  const outputDir = webpackConfigs[0].output.path;
  await emptyDir(outputDir);

  const useDevServer = platform === WEB;

  if (useDevServer) {
    return (await startDevServer({
      context,
      webpackConfigs,
      taskConfigs,
      spinner,
      hooksAPI,
      appConfig,
      devPath,
    }));
  } else {
    return (await invokeCompilerWatch({
      context,
      webpackConfigs,
      taskConfigs,
      spinner,
      hooksAPI,
    }));
  }
};

interface StartDevServerOptions {
  context: Context<Config, ExtendsPluginAPI>;
  webpackConfigs: Configuration[];
  taskConfigs: TaskConfig<Config>[];
  spinner: ora.Ora;
  hooksAPI: {
    serverCompiler: ServerCompiler;
    getAppConfig: GetAppConfig;
    getRoutesConfig: GetRoutesConfig;
  };
  appConfig: AppConfig;
  devPath: string;
}
async function startDevServer({
  context,
  webpackConfigs,
  taskConfigs,
  spinner,
  hooksAPI,
  appConfig,
  devPath,
}: StartDevServerOptions): Promise<{ compiler: Compiler; devServer: WebpackDevServer }> {
  const { commandArgs, userConfig, rootDir, applyHook, extendsPluginAPI: { serverCompileTask } } = context;
  const { port, host, https = false } = commandArgs;
  const { ssg, ssr } = userConfig;
  const { getAppConfig } = hooksAPI;
  const webTaskConfig = taskConfigs.find(({ name }) => name === WEB);
  const customMiddlewares = webpackConfigs[0].devServer?.setupMiddlewares;
  let devServerConfig: DevServerConfiguration = {
    port,
    host,
    https,
    setupMiddlewares: (middlewares, devServer) => {
      let renderMode: RenderMode;
      // If ssr is set to true, use ssr for preview.
      if (ssr) {
        renderMode = 'SSR';
      } else if (ssg) {
        renderMode = 'SSG';
      }
      const routeManifestPath = path.join(rootDir, ROUTER_MANIFEST);
      // both ssr and ssg, should render the whole page in dev mode.
      const documentOnly = !ssr && !ssg;

      const serverRenderMiddleware = createRenderMiddleware({
        serverCompileTask,
        routeManifestPath,
        documentOnly,
        renderMode,
        getAppConfig,
        taskConfig: webTaskConfig,
        userConfig,
      });
      // @ts-ignore
      const insertIndex = middlewares.findIndex(({ name }) => name === 'serve-index');
      middlewares.splice(
        insertIndex, 0,
        serverRenderMiddleware,
      );

    if (commandArgs.mock) {
      const mockMiddleware = createMockMiddleware({ rootDir, exclude: userConfig?.mock?.exclude });
      middlewares.splice(insertIndex, 0, mockMiddleware);
    }
    return customMiddlewares ? customMiddlewares(middlewares, devServer) : middlewares;
  },
  };
  // merge devServerConfig with webpackConfig.devServer
  devServerConfig = merge(webpackConfigs[0].devServer, devServerConfig);
  const protocol = devServerConfig.https ? 'https' : 'http';
  let urlPathname = getRouterBasename(webTaskConfig, appConfig) || '/';

  const urls = prepareURLs(
    protocol,
    devServerConfig.host,
    devServerConfig.port as number,
    urlPathname.endsWith('/') ? urlPathname : `${urlPathname}/`,
  );
  const compiler = await webpackCompiler({
    context,
    webpackConfigs,
    taskConfigs,
    urls,
    hooksAPI,
    spinner,
    devPath,
  });
  const devServer = new WebpackDevServer(devServerConfig, compiler);
  devServer.startCallback(() => {
    applyHook('after.start.devServer', {
      urls,
      devServer,
    });
  });
  return { compiler, devServer };
}

async function invokeCompilerWatch({
  context,
  webpackConfigs,
  taskConfigs,
  spinner,
  hooksAPI,
}: Pick<
  StartDevServerOptions,
  'context' | 'webpackConfigs' | 'taskConfigs' | 'spinner' | 'hooksAPI'
>): Promise<{ compiler: Compiler }> {
  const compiler = await webpackCompiler({
    context,
    webpackConfigs,
    taskConfigs,
    spinner,
    hooksAPI,
  });
  let messages: { errors: string[]; warnings: string[] };
  compiler.watch({
    aggregateTimeout: 300,
    poll: undefined,
  }, async (err, stats) => {
    if (err) {
      if (!err.message) {
        throw err;
      }
      messages = formatWebpackMessages({
        errors: [err.message as unknown as StatsError],
        warnings: [],
      });
    } else {
      messages = formatWebpackMessages(stats.toJson({ all: false, warnings: true, errors: true }));
    }

    if (messages.errors.length) {
      consola.error('webpack compile error');
      throw new Error(messages.errors.join('\n\n'));
    }
  });
  return { compiler };
}

export default start;
