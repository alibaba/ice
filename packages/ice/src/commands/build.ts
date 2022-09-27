import consola from 'consola';
import { getWebpackConfig } from '@ice/webpack-config';
import type { Context, TaskConfig } from 'build-scripts';
import type { StatsError, Stats } from 'webpack';
import type { Config } from '@ice/types';
import type { ServerCompiler, GetAppConfig, GetRoutesConfig, ExtendsPluginAPI } from '@ice/types/esm/plugin.js';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import type ora from '@ice/bundles/compiled/ora/index.js';
import webpackCompiler from '../service/webpackCompiler.js';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import { RUNTIME_TMP_DIR } from '../constant.js';
import emptyDir from '../utils/emptyDir.js';

const build = async (
  context: Context<Config, ExtendsPluginAPI>,
  options: {
    taskConfigs: TaskConfig<Config>[];
    serverCompiler: ServerCompiler;
    spinner: ora.Ora;
    getAppConfig: GetAppConfig;
    getRoutesConfig: GetRoutesConfig;
  },
) => {
  const { taskConfigs, serverCompiler, spinner, getAppConfig, getRoutesConfig } = options;
  const { applyHook, rootDir } = context;
  const webpackConfigs = taskConfigs.map(({ config }) => getWebpackConfig({
    config,
    rootDir,
    // @ts-expect-error fix type error of compiled webpack
    webpack,
    runtimeTmpDir: RUNTIME_TMP_DIR,
  }));
  const outputDir = webpackConfigs[0].output.path;

  await emptyDir(outputDir);
  const hooksAPI = {
    serverCompiler,
    getAppConfig,
    getRoutesConfig,
  };
  const compiler = await webpackCompiler({
    context,
    webpackConfigs,
    taskConfigs,
    spinner,
    hooksAPI,
  });

  const serverEntryRef = { current: null };

  type CompileResults = {
    stats: Stats;
    isSuccessful: boolean;
    messages: { errors: string[]; warnings: string[] };
  };
  const { stats, isSuccessful, messages } = await new Promise<CompileResults>((resolve, reject) => {
    let messages: { errors: string[]; warnings: string[] };
    compiler.run(async (err, stats) => {
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
        const isSuccessful = !messages.errors.length;
        resolve({
          stats,
          messages,
          isSuccessful,
        });
      }
    });
  });

  await applyHook('after.build.compile', {
    stats,
    isSuccessful,
    messages,
    taskConfigs,
    webpackConfigs,
    serverCompiler,
    serverEntryRef,
    getAppConfig,
    getRoutesConfig,
  });

  return { compiler };
};

export default build;
