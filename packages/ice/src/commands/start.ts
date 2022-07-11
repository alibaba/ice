import * as path from 'path';
import WebpackDevServer from 'webpack-dev-server';
import type { Configuration } from 'webpack-dev-server';
import type { Context, TaskConfig } from 'build-scripts';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { Config } from '@ice/types';
import type { ExtendsPluginAPI, ServerCompiler } from '@ice/types/esm/plugin.js';
import type { AppConfig, RenderMode } from '@ice/runtime';
import { getWebpackConfig } from '@ice/webpack-config';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import webpackCompiler from '../service/webpackCompiler.js';
import prepareURLs from '../utils/prepareURLs.js';
import createRenderMiddleware from '../middlewares/ssr/renderMiddleware.js';
import createMockMiddleware from '../middlewares/mock/createMiddleware.js';
import { ROUTER_MANIFEST, RUNTIME_TMP_DIR, SERVER_ENTRY, SERVER_OUTPUT_DIR } from '../constant.js';
import ServerCompilerPlugin from '../webpack/ServerCompilerPlugin.js';
import { getAppConfig } from '../analyzeRuntime.js';

const { merge } = lodash;

const start = async (
  context: Context<Config, ExtendsPluginAPI>,
  taskConfigs: TaskConfig<Config>[],
  serverCompiler: ServerCompiler,
  appConfig: AppConfig,
) => {
  const { applyHook, commandArgs, command, rootDir, userConfig, extendsPluginAPI: { serverCompileTask } } = context;
  const { port, host, https = false } = commandArgs;

  const webpackConfigs = taskConfigs.map(({ config }) => getWebpackConfig({
    config,
    rootDir,
    // @ts-expect-error fix type error of compiled webpack
    webpack,
    runtimeTmpDir: RUNTIME_TMP_DIR,
  }));
  // Compile server entry after the webpack compilation.
  const outputDir = webpackConfigs[0].output.path;
  const { ssg, ssr, server: { format } } = userConfig;
  const entryPoint = path.join(rootDir, SERVER_ENTRY);
  const esm = format === 'esm';
  const outJSExtension = esm ? '.mjs' : '.cjs';
  webpackConfigs[0].plugins.push(
    new ServerCompilerPlugin(
      serverCompiler,
      [
        {
          entryPoints: { index: entryPoint },
          outdir: path.join(outputDir, SERVER_OUTPUT_DIR),
          splitting: esm,
          format,
          platform: esm ? 'browser' : 'node',
          outExtension: { '.js': outJSExtension },
        },
        {
          preBundle: format === 'esm',
        },
      ],
      serverCompileTask,
    ),
  );

  const customMiddlewares = webpackConfigs[0].devServer?.setupMiddlewares;
  let devServerConfig: Configuration = {
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
      const appConfig = getAppConfig();
      const routeManifestPath = path.join(rootDir, ROUTER_MANIFEST);
      const documentOnly = !ssr && !ssg;

      const serverRenderMiddleware = createRenderMiddleware({
        serverCompileTask,
        routeManifestPath,
        documentOnly,
        renderMode,
        basename: appConfig?.router?.basename,
      });
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
  let urlPathname = appConfig?.router?.basename || '/';

  const urls = prepareURLs(
    protocol,
    devServerConfig.host,
    devServerConfig.port as number,
    urlPathname.endsWith('/') ? urlPathname : `${urlPathname}/`,
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
