import * as path from 'path';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import WebpackDevServer from '@ice/bundles/compiled/webpack-dev-server/lib/Server.js';
import type { StatsError, Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type webpack from '@ice/bundles/compiled/webpack/index.js';
import formatWebpackMessages from '../../utils/formatWebpackMessages.js';
import { logger } from '../../utils/logger.js';
import { WEB } from '../../constant.js';
import getMiddlewares from '../config/middlewares.js';
import getDefaultServerConfig from '../config/defaultServerConfig.js';
import getUrls, { getUrlInfo } from '../config/getUrls.js';
import type { BundlerOptions, Context } from '../types.js';

const { merge } = lodash;

export async function startDevServer(
  compiler: webpack.Compiler,
  webpackConfigs: Configuration[],
  context: Context,
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
  const routePaths = routeManifest.getFlattenRoute().sort((a, b) =>
    // Sort by length, shortest path first.
    a.split('/').filter(Boolean).length - b.split('/').filter(Boolean).length);
  const webTaskConfig = taskConfigs.find(({ name }) => name === WEB);
  // @ts-expect-error webpack-dev-server types in Configuration is missing.
  const originalDevServer: DevServerConfiguration = webpackConfigs[0].devServer;
  const customMiddlewares = originalDevServer?.setupMiddlewares;
  const defaultDevServerConfig = await getDefaultServerConfig(originalDevServer, commandArgs);
  let devServerConfig: DevServerConfiguration = {
    ...defaultDevServerConfig,
    setupMiddlewares: (middlewares, devServer) => {
      const builtInMiddlewares = getMiddlewares(middlewares, {
        userConfig,
        routeManifest,
        getAppConfig: hooksAPI.getAppConfig,
        taskConfig: webTaskConfig,
        excuteServerEntry,
        mock: commandArgs.mock,
        rootDir,
      });
      return customMiddlewares ? customMiddlewares(builtInMiddlewares, devServer) : builtInMiddlewares;
    },
  };
  // merge devServerConfig with webpackConfig.devServer
  devServerConfig = merge(originalDevServer, devServerConfig);
  const urls = getUrls({
    taskConfig: webTaskConfig,
    devServerConfig,
    appConfig,
  });
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
      devUrlInfo: getUrlInfo(routePaths),
      messages,
      taskConfigs,
      ...hooksAPI,
    });
    if (isSuccessful) {
      // if compiled successfully reset first compile flag after been posted to lifecycle hooks
      isFirstCompile = false;
    }
  });
  await applyHook('before.start.run', {
    commandArgs,
    taskConfigs,
    webpackConfigs,
    urls,
    ...hooksAPI,
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
  webpackConfigs: Configuration[],
  context: Context,
  options: BundlerOptions,
) {
  const { userConfig, rootDir, applyHook, commandArgs } = context;
  const { outputDir } = userConfig;
  const { taskConfigs, hooksAPI } = options;
  const absoluteOutputDir = path.resolve(rootDir, outputDir);
  let messages: { errors: string[]; warnings: string[] };
  await applyHook('before.start.run', {
    commandArgs,
    taskConfigs,
    webpackConfigs,
    ...hooksAPI,
  });
  let isFirstCompile = true;
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
    const isSuccessful = !messages.errors.length;
    if (messages.errors.length) {
      logger.error('Webpack compile error');
      throw new Error(messages.errors.join('\n\n'));
    }

    await applyHook('after.start.compile', {
      stats,
      isSuccessful,
      isFirstCompile,
      messages,
      taskConfigs,
      ...hooksAPI,
    });
    if (isSuccessful) {
      isFirstCompile = false;
    }
  });
}
