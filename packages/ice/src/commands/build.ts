import consola from 'consola';
import type { Context } from 'build-scripts';
import type { StatsError } from 'webpack';
import webpackCompiler from '../service/webpackCompiler';
import formatWebpackMessages from '../utils/formatWebpackMessages';

const build = async (context: Context<any>) => {
  const { getConfig, applyHook, commandArgs, command } = context;
  const config = getConfig();
  if (!config.length) {
    const errMsg = 'Task config is not found';
    await applyHook('error', { err: new Error(errMsg) });
    return;
  }
  const compiler = await webpackCompiler({
    config: {},
    commandArgs,
    command,
    applyHook,
  });
  const result = await new Promise((resolve, reject): void => {
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
  await applyHook('after.build.compile', result);
  return compiler;
};

export default build;
