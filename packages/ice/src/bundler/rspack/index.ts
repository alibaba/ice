import type { MultiCompiler } from '@rspack/core';
import type { RspackDevServer } from '@rspack/dev-server';
import { logger } from '../../utils/logger.js';
import type { BundlerOptions, Context } from '../types.js';
import getConfig from './getConfig.js';
import start from './start.js';
import build from './build.js';

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
    const { rspack } = await import('@ice/bundles/esm/rspack.js');
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
    devServer = await start(buildOptions);
  } else if (command === 'build') {
    await build(buildOptions);
  }
  return { compiler, devServer };
}


export default bundler;
