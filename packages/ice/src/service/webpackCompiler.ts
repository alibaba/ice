import webpackBundler from '@ice/bundles/compiled/webpack/index.js';
import type ora from '@ice/bundles/compiled/ora/index.js';
import type { TaskConfig, Context } from 'build-scripts';
import type { Config } from '@ice/webpack-config/esm/types';
import type webpack from 'webpack';
import type { Urls, ServerCompiler, GetAppConfig, GetRoutesConfig, ExtendsPluginAPI, GetDataloaderConfig } from '../types/plugin.js';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import { logger } from '../utils/logger.js';

async function webpackCompiler(options: {
  context: Context<Config, ExtendsPluginAPI>;
  webpackConfigs: webpack.Configuration[];
  taskConfigs: TaskConfig<Config>[];
  urls?: Urls;
  spinner: ora.Ora;
  devPath?: string;
  hooksAPI: {
    serverCompiler: ServerCompiler;
    getAppConfig: GetAppConfig;
    getRoutesConfig: GetRoutesConfig;
    getDataloaderConfig: GetDataloaderConfig;
  };
}) {
  const {
    taskConfigs,
    urls,
    hooksAPI,
    webpackConfigs,
    spinner,
    devPath,
    context,
  } = options;
  const { applyHook, commandArgs, command } = context;
  await applyHook(`before.${command}.run`, {
    urls,
    commandArgs,
    taskConfigs,
    webpackConfigs,
    ...hooksAPI,
  });

  // Add default plugins for spinner
  webpackConfigs[0].plugins.push((compiler: webpack.Compiler) => {
    compiler.hooks.beforeCompile.tap('spinner', () => {
      spinner.text = 'compiling...\n';
    });
    compiler.hooks.afterEmit.tap('spinner', () => {
      spinner.stop();
    });
  });
  let compiler: webpack.Compiler;
  try {
    // @ts-ignore
    compiler = webpackBundler(webpackConfigs);
  } catch (err) {
    logger.error('Webpack compile error.');
    logger.error(err.message || err);
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

  return compiler;
}

export default webpackCompiler;
