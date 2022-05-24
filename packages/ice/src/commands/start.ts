import WebpackDevServer from 'webpack-dev-server';
import type { Configuration } from 'webpack-dev-server';
import type { Context, TaskConfig } from 'build-scripts';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { Config } from '@ice/types';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import { getWebpackConfig } from '@ice/webpack-config';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import webpackCompiler from '../service/webpackCompiler.js';
import prepareURLs from '../utils/prepareURLs.js';
import createSSRMiddleware from '../middlewares/ssr.js';
import createMockMiddleware from '../middlewares/mock/createMiddleware.js';

const { defaultsDeep } = lodash;

const start = async (context: Context<Config>, taskConfigs: TaskConfig<Config>[], serverCompiler: ServerCompiler) => {
  const { applyHook, commandArgs, command, rootDir, userConfig } = context;
  const { port, host, https = false } = commandArgs;

  const webpackConfigs = taskConfigs.map(({ config }) => getWebpackConfig({
    config,
    rootDir,
    // @ts-expect-error fix type error of compiled webpack
    webpack,
  }));
  const customMiddlewares = webpackConfigs[0].devServer?.setupMiddlewares;
  let devServerConfig: Configuration = {
    port,
    host,
    https,
    setupMiddlewares: (middlewares, devServer) => {
      const { outputDir } = taskConfigs.find(({ name }) => name === 'web').config;
      const { ssg = true, ssr = true } = userConfig;
      const serverMiddleware = createSSRMiddleware({
        rootDir,
        outputDir,
        serverCompiler,
        documentOnly: !ssr && !ssg,
      });
      const insertIndex = middlewares.findIndex(({ name }) => name === 'serve-index');
      middlewares.splice(insertIndex, 0, serverMiddleware);
      if (commandArgs.mock) {
        const mockMiddleware = createMockMiddleware({ rootDir, exclude: userConfig?.mock?.exclude });
        middlewares.splice(insertIndex, 0, mockMiddleware);
      }
      return customMiddlewares ? customMiddlewares(middlewares, devServer) : middlewares;
    },
  };
  // merge devServerConfig with webpackConfig.devServer
  devServerConfig = defaultsDeep(webpackConfigs[0].devServer, devServerConfig);
  const protocol = devServerConfig.https ? 'https' : 'http';
  const urls = prepareURLs(
    protocol,
    devServerConfig.host,
    devServerConfig.port as number,
  );
  const compiler = await webpackCompiler({
    rootDir,
    webpackConfigs,
    taskConfigs,
    urls,
    commandArgs,
    command,
    applyHook,
    serverCompiler,
  });
  const devServer = new WebpackDevServer(devServerConfig, compiler);
  devServer.startCallback(() => {
    applyHook('after.start.devServer', {
      urls,
      devServer,
    });
  });
  return { compiler, devServer };
};

export default start;
