import type { MultiCompiler, Compiler, rspack as Rspack } from '@rspack/core';
import type { RspackDevServer } from '@rspack/dev-server';
import { logger } from '../../utils/logger.js';
import type { BundlerOptions, Context } from '../types.js';
import { WEB } from '../../constant.js';
import getConfig, { getDataLoaderConfig } from './getConfig.js';
import start from './start.js';
import build from './build.js';

async function bundler(
  context: Context,
  options: BundlerOptions,
) {
  const { command } = context;
  const {
    taskConfigs,
    hooksAPI,
    routeManifest,
    appConfig,
    hasDataLoader,
  } = options;
  let compiler: MultiCompiler;
  let dataLoaderCompiler: Compiler;
  let devServer: RspackDevServer;
  const { rspack } = await import('@rspack/core');
  // Override the type of rspack, because of rspack is imported from pre-compiled bundle.
  const rspackConfigs = await getConfig(context, options, rspack as unknown as typeof Rspack);
  try {
    if (hasDataLoader) {
      const dataLoaderRspackConfig = await getDataLoaderConfig(
        context,
        taskConfigs.find(({ name }) => name === WEB),
        rspack as unknown as typeof Rspack,
      );
      if (command === 'start') {
        // Create a special compiler for dataLoader,
        // it will be used in dev-server middleware.
        // @ts-ignore
        dataLoaderCompiler = rspack(dataLoaderRspackConfig);
      } else if (command === 'build') {
        // Build parrallel when build.
        rspackConfigs.push(dataLoaderRspackConfig);
        // Override the output options of clean to false,
        // Otherwise, the output of previous build will be cleaned.
        rspackConfigs.forEach((config) => {
          if (config?.output?.clean) {
            config.output.clean = false;
          }
        });
      }
    }
    // @ts-ignore
    compiler = rspack(rspackConfigs);
  } catch (error) {
    logger.error('Webpack compile error.');
    logger.error(error);
  }
  const buildOptions = {
    context,
    compiler,
    routeManifest,
    appConfig,
    hooksAPI,
    taskConfigs,
    rspackConfigs,
  };
  if (command === 'start') {
    devServer = await start(buildOptions, dataLoaderCompiler);
  } else if (command === 'build') {
    await build(buildOptions);
  }
  return { compiler, devServer };
}


export default bundler;
