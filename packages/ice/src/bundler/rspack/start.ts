import type { Configuration as DevServerConfiguration } from '@rspack/dev-server';
import getDefaultServerConfig from '../config/defaultServerConfig.js';
import getMiddlewares from '../config/middlewares.js';
import { logger } from '../../utils/logger.js';
import getUrls from '../config/getUrls.js';
import { WEB } from '../../constant.js';
import type { BuildOptions } from '../types.js';
import formatStats from './formatStats.js';

const start = async ({
  context,
  rspackConfigs,
  taskConfigs,
  routeManifest,
  compiler,
  appConfig,
  hooksAPI,
}: BuildOptions) => {
  const { rootDir, applyHook, commandArgs, userConfig, extendsPluginAPI: { excuteServerEntry } } = context;
  const customMiddlewares = rspackConfigs[0].devServer?.setupMiddlewares;
  const defaultConfig = await getDefaultServerConfig(rspackConfigs[0].devServer, commandArgs);
  const webTaskConfig = taskConfigs.find(({ name }) => name === WEB);
  const devServerConfig: DevServerConfiguration = {
    ...defaultConfig,
    ...rspackConfigs[0].devServer,
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
  const routePaths = routeManifest.getFlattenRoute().sort((a, b) =>
    // Sort by length, shortest path first.
    a.split('/').filter(Boolean).length - b.split('/').filter(Boolean).length);
    let isFirstCompile = true;
  const urls = getUrls({
    taskConfig: webTaskConfig,
    appConfig,
    devServerConfig,
  });
  await applyHook('before.start.run', {
    commandArgs,
    taskConfigs,
    rspackConfigs,
    urls,
    ...hooksAPI,
  });

  const { RspackDevServer } = await import('@ice/bundles/esm/dev-server.js');
  const devServer = new RspackDevServer(devServerConfig, compiler);

  compiler.hooks.done.tap('done', async stats => {
    const obj = stats.toJson({
      all: false,
      timings: true,
    });
    if (!stats.hasErrors()) {
      obj.children?.forEach(c => {
        c.time &&
          logger.success(`${c.name} compiled successfully in`, c.time, 'ms');
      });
    }
    const { message, level } = formatStats(stats);
    let isSuccessful = level !== 'error';
    if (level === 'error' || level === 'warning') {
      logger.log(message);
    }

    await applyHook('after.start.compile', {
      stats,
      isSuccessful,
      isFirstCompile,
      urls,
      devUrlInfo: {
        devPath: (routePaths[0] || '').replace(/^[/\\]/, ''),
      },
      messages: message,
      taskConfigs,
      ...hooksAPI,
    });
    isFirstCompile = false;
  });

  devServer.startCallback(() => {
    applyHook('after.start.devServer', {
      urls,
      devServer,
    });
  });
  return devServer;
};

export default start;
