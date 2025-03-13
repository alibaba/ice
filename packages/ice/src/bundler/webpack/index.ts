import webpack from '@ice/bundles/compiled/webpack/index.js';
import type WebpackDevServer from '@ice/bundles/compiled/webpack-dev-server/lib/Server.js';
import { logger } from '../../utils/logger.js';
import type { BundlerOptions, Context } from '../types.js';
import getWebpackConfig from './getWebpackConfig.js';
import build from './build.js';
import { startDevServer, invokeCompilerWatch } from './start.js';

async function bundler(
  context: Context,
  options: BundlerOptions,
) {
  const { command } = context;
  const {
    taskConfigs,
  } = options;
  const webpackConfigs = await getWebpackConfig(context, options);

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
      await invokeCompilerWatch(compiler, webpackConfigs, context, options);
    }
  } else if (command === 'build') {
    await build(compiler, webpackConfigs, context, options);
  }
  return { compiler, devServer };
}


export default bundler;
