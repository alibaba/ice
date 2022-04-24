import webpack from '@ice/bundles/compiled/webpack/index.js';
import consola from 'consola';
import chalk from 'chalk';
import type { CommandArgs } from 'build-scripts';
import type { Compiler, Configuration } from 'webpack';
import type { Urls, EsbuildCompile } from '@ice/types/esm/plugin.js';
import type { Config } from '@ice/types';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import type { WebpackConfig } from '../utils/getContextConfig';

async function webpackCompiler(options: {
  webpackConfigs: WebpackConfig | WebpackConfig[];
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
    // @ts-expect-error ignore error with different webpack referer
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
    if (isSuccessful && !process.env.DISABLE_STATS) {
      const assetsStatsOptions = {
        errors: false,
        warnings: false,
        colors: true,
        assets: true,
        chunks: false,
        entrypoints: false,
        modules: false,
        timings: false,
      };
      consola.log(stats.toString(assetsStatsOptions));
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
    if (command === 'start') {
      if (isSuccessful) {
        let logoutMessage = '\n';
        logoutMessage += chalk.green(' Starting the development server at:');
        if (process.env.CLOUDIDE_ENV) {
          logoutMessage += `\n   - IDE server: https://${process.env.WORKSPACE_UUID}-${commandArgs.port}.${process.env.WORKSPACE_HOST}`;
        } else {
          logoutMessage += `\n
   - Local  : ${chalk.underline.white(urls.localUrlForBrowser)}
   - Network:  ${chalk.underline.white(urls.lanUrlForTerminal)}`;
        }
        consola.log(`${logoutMessage}\n`);
      }
      // compiler.hooks.done is AsyncSeriesHook which does not support async function
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

    if (isSuccessful) {
      consola.success(`Compiled successfully in ${(statsData.children ? statsData.children[0] : statsData).time} ms`);
      // if compiled successfully reset first compile flag after been posted to lifecycle hooks
      isFirstCompile = false;
    }
  });

  return compiler;
}

export default webpackCompiler;
