import webpack from '@ice/bundles/compiled/webpack/index.js';
import type ora from '@ice/bundles/compiled/ora/index.js';
import consola from 'consola';
import type { CommandArgs, TaskConfig } from 'build-scripts';
import type { Compiler, Configuration } from 'webpack';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';
import type { Urls, ServerCompiler, GetAppConfig, GetRoutesConfig } from '@ice/types/esm/plugin.js';
import type { Config } from '@ice/types';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';

type WebpackConfig = Configuration & { devServer?: DevServerConfiguration };

async function webpackCompiler(options: {
  webpackConfigs: WebpackConfig | WebpackConfig[];
  taskConfigs: TaskConfig<Config>[];
  command: string;
  commandArgs: CommandArgs;
  applyHook: (key: string, opts?: {}) => Promise<void>;
  urls?: Urls;
  spinner: ora.Ora;
  devPath?: string;
  hooksAPI: {
    serverCompiler: ServerCompiler;
    getAppConfig: GetAppConfig;
    getRoutesConfig: GetRoutesConfig;
  };
}) {
  const {
    taskConfigs,
    urls,
    applyHook,
    command,
    commandArgs,
    hooksAPI,
    webpackConfigs,
    spinner,
    devPath,
  } = options;
  await applyHook(`before.${command}.run`, {
    urls,
    commandArgs,
    taskConfigs,
    webpackConfigs,
    ...hooksAPI,
  });

  // Add default plugins for spinner
  webpackConfigs[0].plugins.push((compiler: Compiler) => {
    compiler.hooks.beforeCompile.tap('spinner', () => {
      spinner.text = 'compiling...';
    });
    compiler.hooks.afterEmit.tap('spinner', () => {
      spinner.stop();
    });
  });
  let compiler: Compiler;
  try {
    // @ts-expect-error ignore error with different webpack referer
    compiler = webpack(webpackConfigs as Configuration);
  } catch (err) {
    consola.error('Webpack compile error.');
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
    const isSuccessful = !messages.errors.length;
    if (messages.errors.length) {
      // Only keep the first error. Others are often indicative
      // of the same problem, but confuse the reader with noise.
      if (messages.errors.length > 1) {
        messages.errors.length = 1;
      }
      consola.error('Failed to compile.');
      console.error(messages.errors.join('\n'));
      return;
    } else if (messages.warnings.length) {
      consola.warn('Compiled with warnings.');
      consola.warn(messages.warnings.join('\n'));
    }
    if (command === 'start') {
      const appConfig = (await hooksAPI.getAppConfig()).default;
      const hashChar = appConfig?.router?.type === 'hash' ? '#/' : '';
      // compiler.hooks.done is AsyncSeriesHook which does not support async function
      await applyHook('after.start.compile', {
        stats,
        isSuccessful,
        isFirstCompile,
        urls,
        devUrlInfo: {
          hashChar,
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

  return compiler;
}

export default webpackCompiler;
