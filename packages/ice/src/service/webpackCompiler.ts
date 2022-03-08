import webpack from 'webpack';
import consola from 'consola';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import { getWebpackConfig } from '@builder/webpack-config';
import type { CommandArgs } from 'build-scripts';
import type { Compiler, Configuration } from 'webpack';
import type { UnpluginOptions } from 'unplugin';
import type { Urls } from '@ice/types/esm/plugin.js';
import type { Config } from '@ice/types';

async function webpackCompiler(options: {
  config: Config;
  command: string;
  commandArgs: CommandArgs;
  applyHook: (key: string, opts?: {}) => Promise<void>;
  rootDir: string;
  urls?: Urls;
  getTransformPlugins?: (config: Config) => UnpluginOptions[];
}) {
  const { rootDir, config, urls, applyHook, command, commandArgs, getTransformPlugins } = options;
  await applyHook(`before.${command}.run`, {
    commandArgs,
    config,
    getTransformPlugins,
  });
  let compiler: Compiler;
  try {
    const webpackConfig = getWebpackConfig({ rootDir, config });
    compiler = webpack(webpackConfig as Configuration);
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
    await applyHook(`after.${command}.compile`, {
      stats,
      isSuccessful,
      isFirstCompile,
      urls,
      messages,
    });
  });

  return compiler;
}

export default webpackCompiler;
