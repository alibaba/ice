import chalk from 'chalk';
import type { Context } from 'build-scripts';
import type { Config } from '@ice/webpack-config/types';
import type { Configuration as DevServerConfiguration } from '@rspack/dev-server';
import type { RenderMode } from '@ice/runtime';
import formatWebpackMessages from '../../utils/formatWebpackMessages.js';
import prepareURLs from '../../utils/prepareURLs.js';
import { logger } from '../../utils/logger.js';
import { DEFAULT_HOST, DEFAULT_PORT, WEB } from '../../constant.js';
import createRenderMiddleware from '../../middlewares/renderMiddleware.js';
import type { ExtendsPluginAPI } from '../../types/plugin.js';
import type { BundlerOptions, Stats, MultiStats } from '../types.js';
import getConfig from './getConfig.js';

function formatStats(stats: Stats | MultiStats, showWarnings = true) {
  const statsData = stats.toJson({
    preset: 'errors-warnings',
  });
  // @ts-ignore
  const { errors, warnings } = formatWebpackMessages(statsData);

  if (errors.length) {
    const errorMsgs = `${errors.join('\n\n')}\n`;
    const isTerserError = errorMsgs.includes('from Terser');
    const title = chalk.red.bold(
      isTerserError ? 'Minify Error: ' : 'Compile Error: ',
    );
    const tip = chalk.yellow(
      isTerserError
        ? 'Failed to minify the code with terser, please check if there are any syntax errors in the code.'
        : 'Failed to compile the code, please refer to the following errors for troubleshooting.',
    );

    return {
      message: `${title}\n${tip}\n${errorMsgs}`,
      level: 'error',
    };
  }

  // always show warnings in tty mode
  if (warnings.length && (showWarnings || process.stdout.isTTY)) {
    const title = chalk.yellow.bold('Compile Warning: \n');
    return {
      message: `${title}${`${warnings.join('\n\n')}\n`}`,
      level: 'warning',
    };
  }

  return {};
}

async function bundler(
  context: Context<Config, ExtendsPluginAPI>,
  options: BundlerOptions,
) {
  const { command, applyHook, commandArgs, userConfig, extendsPluginAPI: { excuteServerEntry } } = context;
  const {
    taskConfigs,
    hooksAPI,
    routeManifest,
  } = options;
  const rspackConfigs = await getConfig(context, options);
  const webTaskConfig = taskConfigs.find(({ name }) => name === WEB);

  await applyHook(`before.${command}.run`, {
    commandArgs,
    taskConfigs,
    rspackConfigs,
    ...hooksAPI,
  });

  let compiler;
  let devServer;
  try {
    const { rspack } = await import('@rspack/core');
    compiler = rspack(rspackConfigs[0]);

    let isFirstCompile = true;

    compiler.hooks.done.tap('done', async stats => {
      const obj = stats.toJson({
        all: false,
        timings: true,
      });

      if (!stats.hasErrors()) {
        obj.children?.forEach(c => {
          c.time &&
            logger.success(`${c.name} compiled successfully in`, c.time, 'ms');
        });
      }

      const { message, level } = formatStats(stats);

      if (level === 'error' || level === 'warning') {
        logger.log(message);
      }

      isFirstCompile = false;
    });
    } catch (error) {
      logger.error('Webpack compile error.');
      logger.error(error);
    }

  if (command === 'start') {
    const { ssg, ssr } = userConfig;
    const customMiddlewares = rspackConfigs[0].devServer?.setupMiddlewares;
    const host = process.env.HOST ||
      commandArgs.host ||
      rspackConfigs[0].devServer?.host ||
      DEFAULT_HOST;
    const port = process.env.PORT ||
      commandArgs.port ||
      rspackConfigs[0].devServer?.port ||
      DEFAULT_PORT;
    const devServerConfig: DevServerConfiguration = {
      port,
      host,
      ...rspackConfigs[0].devServer,
      setupMiddlewares: (middlewares, devServer) => {
        let renderMode: RenderMode;
        if (ssr) {
          renderMode = 'SSR';
        } else if (ssg) {
          renderMode = 'SSG';
        }
        // both ssr and ssg, should render the whole page in dev mode.
        const documentOnly = !ssr && !ssg;
        const middlewareOptions = {
          documentOnly,
          renderMode,
          getAppConfig: hooksAPI.getAppConfig,
          taskConfig: webTaskConfig,
          userConfig,
          routeManifest,
        };
        const serverRenderMiddleware = createRenderMiddleware({
          ...middlewareOptions,
          excuteServerEntry,
        });
        // @ts-ignore
        const insertIndex = middlewares.findIndex(({ name }) => name === 'serve-index');
        middlewares.splice(
          insertIndex, 0,
          serverRenderMiddleware,
        );
        return customMiddlewares ? customMiddlewares(middlewares, devServer) : middlewares;
      },
    };
    // TODO: generate urls by app config.
    const urls = prepareURLs(
      'http',
      devServerConfig.host,
      devServerConfig.port as number,
      '/',
      false,
    );
    // Start dev server
    const { RspackDevServer } = await import('@rspack/dev-server');
    const devServer = new RspackDevServer(devServerConfig, compiler);
    devServer.startCallback(() => {
      applyHook('after.start.devServer', {
        urls,
        devServer,
      });
    });
  } else if (command === 'build') {
    // await build(compiler, webpackConfigs, context, options);
  }
  return { compiler, devServer };
}


export default bundler;
