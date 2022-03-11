import consola from 'consola';
import type { Context } from 'build-scripts';
import type { StatsError } from 'webpack';
import type { Config } from '@ice/types';
import type { EsbuildCompile } from '@ice/types/esm/plugin.js';
import webpackCompiler from '../service/webpackCompiler.js';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import type { ContextConfig } from '../utils/getContextConfig.js';

const build = async (context: Context<Config>, contextConfig: ContextConfig[], esbuildCompile: EsbuildCompile) => {
  const { applyHook, commandArgs, command, rootDir } = context;
  const webConfig = contextConfig.find(({ name }) => name === 'web');
  const compiler = await webpackCompiler({
    rootDir,
    webpackConfigs: contextConfig.map(({ webpackConfig }) => webpackConfig),
    taskConfig: webConfig.taskConfig,
    commandArgs,
    command,
    applyHook,
    esbuildCompile,
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
