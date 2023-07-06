
import webpack from '@ice/bundles/compiled/webpack/index.js';
import type { Context } from 'build-scripts';
import type { Config } from '@ice/webpack-config/types';
import { logger } from '../../utils/logger.js';
import formatWebpackMessages from '../../utils/formatWebpackMessages.js';
import type { ExtendsPluginAPI } from '../../types/plugin.js';
import getWebpackConfig from './getWebpackConfig.js';
import type { BundlerOptions } from './types.js';
import build from './build.js';


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
  let urls = [];
  let devPath = '';
  if (command === 'start') {
  }
  await applyHook(`before.${command}.run`, {
    urls,
    commandArgs,
    taskConfigs,
    webpackConfigs,
    ...hooksAPI,
  });

  let compiler: webpack.Compiler;
  try {
    // @ts-ignore
    compiler = webpack(webpackConfigs);
  } catch (error) {
    logger.error('Webpack compile error.');
    logger.error(error);
  }
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
    if (command === 'start') {
      // compiler.hooks.done is AsyncSeriesHook which does not support async function
      await applyHook('after.start.compile', {
        stats,
        isSuccessful,
        isFirstCompile,
        urls,
        devUrlInfo: {
          devPath,
        },
        messages,
        taskConfigs,
        ...hooksAPI,
      });
    }
    if (isSuccessful) {
      // if compiled successfully reset first compile flag after been posted to lifecycle hooks
      isFirstCompile = false;
    }
  });

  if (command === 'start') {
    console.log('start dev server');
  } else if (command === 'build') {
    await build(compiler, webpackConfigs, context, options);
  }
  return { compiler };
}


export default bundler;
