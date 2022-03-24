import webpack from 'webpack';
import consola from 'consola';
import type { CommandArgs } from 'build-scripts';
import type { Compiler, Configuration } from 'webpack';
import type { Urls, EsbuildCompile } from '@ice/types/esm/plugin.js';
import type { Config } from '@ice/types';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';

async function webpackCompiler(options: {
  webpackConfigs: Configuration | Configuration[];
  taskConfig: Config;
  command: string;
  commandArgs: CommandArgs;
  applyHook: (key: string, opts?: {}) => Promise<void>;
  rootDir: string;
  urls?: Urls;
  esbuildCompile: EsbuildCompile;
}) {
  const { taskConfig, urls, applyHook, command, commandArgs, esbuildCompile, webpackConfigs } = options;
  await applyHook(`before.${command}.run`, {
    commandArgs,
    taskConfig,
    webpackConfigs,
    esbuildCompile,
  });
  let compiler: Compiler;
  try {
    compiler = webpack(webpackConfigs as Configuration);
  } catch (err) {
    consola.error('Failed to compile.');
    consola.log('');
    consola.error(err.message || err);
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
    const isSuccessful = !messages.errors.length && !messages.warnings.length;
    if (isSuccessful) {
      consola.success(`Compiled successfully in ${(statsData.children ? statsData.children[0] : statsData).time} ms`);
      isFirstCompile = false;
    }
    if (messages.errors.length) {
      // Only keep the first error. Others are often indicative
      // of the same problem, but confuse the reader with noise.
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      consola.error('Failed to compile.\n');
      consola.error(messages.errors.join('\n\n'));
      return;
    } else if (messages.warnings.length) {
      consola.warn('Compiled with warnings.\n');
      consola.warn(messages.warnings.join('\n\n'));
    }
    // compiler.hooks.done is AsyncSeriesHook which does not support async function
    if (command === 'start') {
      await applyHook('after.start.compile', {
        stats,
        isSuccessful,
        isFirstCompile,
        urls,
        messages,
        taskConfig,
        esbuildCompile,
      });
    }
  });

  return compiler;
}

export default webpackCompiler;
