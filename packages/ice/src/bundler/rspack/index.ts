import type { MultiCompiler } from '@rspack/core';
import type { RspackDevServer } from '@rspack/dev-server';
import { logger } from '../../utils/logger.js';
import type { BundlerOptions, Context } from '../types.js';
import getConfig from './getConfig.js';
import start from './start.js';

async function bundler(
  context: Context,
  options: BundlerOptions,
) {
  const { command, applyHook, commandArgs } = context;
  const {
    taskConfigs,
    hooksAPI,
    routeManifest,
    appConfig,
  } = options;
  const rspackConfigs = await getConfig(context, options);
  await applyHook(`before.${command}.run`, {
    commandArgs,
    taskConfigs,
    rspackConfigs,
    ...hooksAPI,
  });

  let compiler: MultiCompiler;
  let devServer: RspackDevServer;
  try {
    const { rspack } = await import('@rspack/core');
    compiler = rspack(rspackConfigs);
  } catch (error) {
    logger.error('Webpack compile error.');
    logger.error(error);
  }

  if (command === 'start') {
    devServer = await start({
      context,
      compiler,
      routeManifest,
      appConfig,
      hooksAPI,
      taskConfigs,
      rspackConfigs,
    });
  } else if (command === 'build') {
    // Not support yet.
  }
  return { compiler, devServer };
}


export default bundler;
