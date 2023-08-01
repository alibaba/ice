import webpack from '@ice/bundles/compiled/webpack/index.js';
import type WebpackDevServer from '@ice/bundles/compiled/webpack-dev-server/lib/Server.js';
import type { Context } from 'build-scripts';
import type { Config } from '@ice/webpack-config/types';
import { logger } from '../../utils/logger.js';
import type { ExtendsPluginAPI } from '../../types/plugin.js';
import type { BundlerOptions } from '../types.js';
import getWebpackConfig from './getWebpackConfig.js';
import build from './build.js';
import { startDevServer, invokeCompilerWatch } from './start.js';

async function bundler(
  context: Context<Config, ExtendsPluginAPI>,
  options: BundlerOptions,
) {
  const { command, applyHook, commandArgs } = context;
  const {
    taskConfigs,
    hooksAPI,
  } = options;
  const webpackConfigs = await getWebpackConfig(context, options);

  await applyHook(`before.${command}.run`, {
    commandArgs,
    taskConfigs,
    webpackConfigs,
    ...hooksAPI,
  });

  let compiler: webpack.Compiler;
  let devServer: WebpackDevServer;
  try {
    // @ts-ignore
    compiler = webpack(webpackConfigs);
  } catch (error) {
    logger.error('Webpack compile error.');
    logger.error(error);
  }

  if (command === 'start') {
    const useDevServer = taskConfigs.reduce((prev, curr) => prev || curr.config.useDevServer, false);
    if (useDevServer) {
      devServer = await startDevServer(compiler, webpackConfigs, context, options);
    } else {
      await invokeCompilerWatch(compiler, context);
    }
  } else if (command === 'build') {
    await build(compiler, webpackConfigs, context, options);
  }
  return { compiler, devServer };
}


export default bundler;
