import consola from 'consola';
import type { Context } from 'build-scripts';
import type { StatsError } from 'webpack';
import webpackCompiler from '../service/webpackCompiler.js';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import { getWebpackConfig, getTransformPlugins } from '@builder/webpack-config';
import type { Config } from '@ice/types';

const build = async (context: Context<Config>) => {
  const { getConfig, applyHook, commandArgs, command, rootDir } = context;
  const configs = getConfig();
  if (!configs.length) {
    const errMsg = 'Task config is not found';
    await applyHook('error', { err: new Error(errMsg) });
    return;
  }
  // transform config to webpack config
  const webpackConfig = configs.map((task) => {
    return getWebpackConfig({
      rootDir,
      config: task.config,
    });
  });
  const transformPlugins = getTransformPlugins(rootDir, configs.find(({ name }) => name === 'web').config);
  const compiler = await webpackCompiler({
    config: webpackConfig,
    commandArgs,
    command,
    applyHook,
    transformPlugins,
  });
  await new Promise((resolve, reject): void => {
    let messages: { errors: string[]; warnings: string[] };
    compiler.run((err, stats) => {
      if (err) {
        if (!err.message) {
          reject(err);
          return;
        }
        messages = formatWebpackMessages({
          errors: [err.message as unknown as StatsError],
          warnings: [],
        });
      } else {
        messages = formatWebpackMessages(stats.toJson({ all: false, warnings: true, errors: true }));
      }

      if (messages.errors.length) {
        consola.error('webpack compile error');
        reject(new Error(messages.errors.join('\n\n')));
        return;
      } else {
        compiler?.close?.(() => {});
        resolve({
          stats,
        });
      }
    });
  });
  return compiler;
};

export default build;
