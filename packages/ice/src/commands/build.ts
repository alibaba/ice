import * as path from 'path';
import consola from 'consola';
import fse from 'fs-extra';
import { getWebpackConfig } from '@ice/webpack-config';
import type { Context, TaskConfig } from 'build-scripts';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import type { StatsError, Stats } from 'webpack';
import type { Config } from '@ice/webpack-config/esm/types';
import type ora from '@ice/bundles/compiled/ora/index.js';
import type { AppConfig } from '@ice/runtime/esm/types';
import type { ServerCompiler, GetAppConfig, GetRoutesConfig, ExtendsPluginAPI, GetDataloaderConfig } from '../types/plugin.js';
import webpackCompiler from '../service/webpackCompiler.js';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import { RUNTIME_TMP_DIR, SERVER_OUTPUT_DIR } from '../constant.js';
import emptyDir from '../utils/emptyDir.js';
import type { UserConfig } from '../types/userConfig.js';
import warnOnHashRouterEnabled from '../utils/warnOnHashRouterEnabled.js';

const build = async (
  context: Context<Config, ExtendsPluginAPI>,
  options: {
    taskConfigs: TaskConfig<Config>[];
    serverCompiler: ServerCompiler;
    spinner: ora.Ora;
    getAppConfig: GetAppConfig;
    appConfig: AppConfig;
    getRoutesConfig: GetRoutesConfig;
    getDataloaderConfig: GetDataloaderConfig;
    userConfigHash: string;
    userConfig: UserConfig;
  },
) => {
  const {
    taskConfigs,
    serverCompiler,
    spinner,
    getAppConfig,
    appConfig,
    getRoutesConfig,
    getDataloaderConfig,
    userConfigHash,
    userConfig,
  } = options;
  const { applyHook, rootDir } = context;

  if (appConfig?.router?.type === 'hash') {
    warnOnHashRouterEnabled(userConfig);
  }

  const webpackConfigs = taskConfigs.map(({ config }) => getWebpackConfig({
    config,
    rootDir,
    // @ts-expect-error fix type error of compiled webpack
    webpack,
    runtimeTmpDir: RUNTIME_TMP_DIR,
    userConfigHash,
  }));
  const outputDir = webpackConfigs[0].output.path;

  await emptyDir(outputDir);
  const hooksAPI = {
    serverCompiler,
    getAppConfig,
    getRoutesConfig,
    getDataloaderConfig,
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
        compiler?.close?.(() => { });
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
    getDataloaderConfig,
    appConfig,
  });

  await removeServerOutput(outputDir, userConfig.ssr);

  return { compiler };
};

async function removeServerOutput(outputDir: string, ssr: boolean) {
  if (!ssr) {
    await fse.remove(path.join(outputDir, SERVER_OUTPUT_DIR));
  }
}

export default build;
