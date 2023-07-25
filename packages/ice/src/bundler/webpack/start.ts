import * as path from 'path';
import type webpack from '@ice/bundles/compiled/webpack/index.js';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import WebpackDevServer from '@ice/bundles/compiled/webpack-dev-server/lib/Server.js';
import detectPort from 'detect-port';
import type { RenderMode } from '@ice/runtime';
import type { StatsError, Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Context } from 'build-scripts';
import type { Config } from '@ice/webpack-config/types';
import formatWebpackMessages from '../../utils/formatWebpackMessages.js';
import { logger } from '../../utils/logger.js';
import { WEB, DEFAULT_HOST, DEFAULT_PORT } from '../../constant.js';
import prepareURLs from '../../utils/prepareURLs.js';
import createRenderMiddleware from '../../middlewares/renderMiddleware.js';
import createMockMiddleware from '../../middlewares/mock/createMiddleware.js';
import getRouterBasename from '../../utils/getRouterBasename.js';
import type { ExtendsPluginAPI } from '../../types/plugin.js';
import type { BundlerOptions } from '../types.js';

const { merge } = lodash;

export async function startDevServer(
  compiler: webpack.Compiler,
  webpackConfigs: Configuration[],
  context: Context<Config, ExtendsPluginAPI>,
  options: BundlerOptions,
) {
  const { rootDir, applyHook, commandArgs, extendsPluginAPI: { excuteServerEntry } } = context;
  const {
    taskConfigs,
    hooksAPI,
    routeManifest,
    userConfig,
    appConfig,
  } = options;
  const { ssg, ssr } = userConfig;
  const routePaths = routeManifest.getFlattenRoute().sort((a, b) =>
    // Sort by length, shortest path first.
    a.split('/').filter(Boolean).length - b.split('/').filter(Boolean).length);
  const webTaskConfig = taskConfigs.find(({ name }) => name === WEB);
  const customMiddlewares = webpackConfigs[0].devServer?.setupMiddlewares;
  // Get the value of the host and port from the command line, environment variables, and webpack config.
  // Value priority: process.env.PORT > commandArgs > webpackConfig > DEFAULT.
  const host = process.env.HOST ||
    commandArgs.host ||
    webpackConfigs[0].devServer?.host ||
    DEFAULT_HOST;
  const port = process.env.PORT ||
    commandArgs.port ||
    webpackConfigs[0].devServer?.port ||
    await detectPort(DEFAULT_PORT);

  let devServerConfig: DevServerConfiguration = {
    port,
    host,
    setupMiddlewares: (middlewares, devServer) => {
      let renderMode: RenderMode;
      // If ssr is set to true, use ssr for preview.
      if (ssr) {
        renderMode = 'SSR';
      } else if (ssg) {
        renderMode = 'SSG';
      }
      // both ssr and ssg, should render the whole page in dev mode.
      const documentOnly = !ssr && !ssg;
      const middlewareOptions = {
        documentOnly,
        renderMode,
        getAppConfig: hooksAPI.getAppConfig,
        taskConfig: webTaskConfig,
        userConfig,
        routeManifest,
      };
      const serverRenderMiddleware = createRenderMiddleware({
        ...middlewareOptions,
        excuteServerEntry,
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
  const enabledHashRouter = appConfig.router?.type === 'hash';
  const urls = prepareURLs(
    protocol,
    devServerConfig.host,
    devServerConfig.port as number,
    urlPathname.endsWith('/') ? urlPathname : `${urlPathname}/`,
    enabledHashRouter,
  );
  let isFirstCompile = true;
  compiler.hooks.done.tap('done', async stats => {
    const statsData = stats.toJson({
      all: false,
      warnings: true,
      errors: true,
      timings: true,
      assets: true,
    });
    const messages = formatWebpackMessages(statsData);
    const isSuccessful = !messages.errors.length;
    if (messages.errors.length) {
      // Only keep the first error. Others are often indicative
      // of the same problem, but confuse the reader with noise.
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      logger.error('Client compiled with errors.');
      console.error(messages.errors.join('\n'));
      return;
    } else if (messages.warnings.length) {
      logger.warn('Client compiled with warnings.');
      logger.warn(messages.warnings.join('\n'));
    }
    // compiler.hooks.done is AsyncSeriesHook which does not support async function
    await applyHook('after.start.compile', {
      stats,
      isSuccessful,
      isFirstCompile,
      urls,
      devUrlInfo: {
        devPath: (routePaths[0] || '').replace(/^[/\\]/, ''),
      },
      messages,
      taskConfigs,
      ...hooksAPI,
    });
    if (isSuccessful) {
      // if compiled successfully reset first compile flag after been posted to lifecycle hooks
      isFirstCompile = false;
    }
  });

  const devServer = new WebpackDevServer(devServerConfig, compiler);
  devServer.startCallback(() => {
    applyHook('after.start.devServer', {
      urls,
      devServer,
    });
  });

  return devServer;
}

export async function invokeCompilerWatch(
  compiler: webpack.Compiler,
  context: Context<Config, ExtendsPluginAPI>,
) {
  const { userConfig, rootDir } = context;
  const { outputDir } = userConfig;
  const absoluteOutputDir = path.resolve(rootDir, outputDir);
  let messages: { errors: string[]; warnings: string[] };
  compiler.watch({
    aggregateTimeout: 200,
    ignored: ['**/node_modules/**', `${absoluteOutputDir}/**`],
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
      logger.error('Webpack compile error');
      throw new Error(messages.errors.join('\n\n'));
    }
  });
}
