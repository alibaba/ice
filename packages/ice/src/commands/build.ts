import * as path from 'path';
import fse from 'fs-extra';
import { getWebpackConfig } from '@ice/webpack-config';
import type { Context, TaskConfig } from 'build-scripts';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import type { StatsError, Stats } from 'webpack';
import type { Config } from '@ice/webpack-config/types';
import type ora from '@ice/bundles/compiled/ora/index.js';
import type { AppConfig } from '@ice/runtime/types';
import type { RenderMode } from '@ice/runtime';
import type { ServerCompiler, GetAppConfig, GetRoutesConfig, ExtendsPluginAPI, GetDataloaderConfig } from '../types/plugin.js';
import webpackCompiler from '../service/webpackCompiler.js';
import formatWebpackMessages from '../utils/formatWebpackMessages.js';
import { IMPORT_META_RENDERER, IMPORT_META_TARGET, RUNTIME_TMP_DIR, SERVER_OUTPUT_DIR, WEB } from '../constant.js';
import emptyDir from '../utils/emptyDir.js';
import type { UserConfig } from '../types/userConfig.js';
import warnOnHashRouterEnabled from '../utils/warnOnHashRouterEnabled.js';
import generateEntry from '../utils/generateEntry.js';
import { logger } from '../utils/logger.js';
import { getExpandedEnvs } from '../utils/runtimeEnv.js';
import type RouteManifest from '../utils/routeManifest.js';

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
    routeManifest: RouteManifest;
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
    routeManifest,
  } = options;
  const { applyHook, commandArgs, rootDir, extendsPluginAPI: { serverCompileTask } } = context;
  const { target = WEB } = commandArgs;

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
    getExpandedEnvs,
    runtimeDefineVars: {
      [IMPORT_META_TARGET]: JSON.stringify(target),
      [IMPORT_META_RENDERER]: JSON.stringify('client'),
    },
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
  const output = {
    paths: [],
  };

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
        logger.error('Webpack compile error.');
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

  const {
    ssg,
    output: {
      distType,
    },
  } = userConfig;
  let renderMode: RenderMode;
  if (ssg) {
    renderMode = 'SSG';
  }
  const { serverEntry } = await serverCompileTask.get();
  serverEntryRef.current = serverEntry;
  const routeType = appConfig?.router?.type;
  const {
    outputPaths = [],
  } = await generateEntry({
    rootDir,
    outputDir,
    entry: serverEntry,
    // only ssg need to generate the whole page html when build time.
    documentOnly: !ssg,
    renderMode,
    routeType: appConfig?.router?.type,
    distType,
    routeManifest,
  });
  // This depends on orders.
  output.paths = [...outputPaths];

  if (routeType === 'memory' && userConfig?.routes?.injectInitialEntry) {
    // Read the latest routes info.
    const routePaths = routeManifest.getFlattenRoute();
    routePaths.forEach((routePath) => {
      // Inject `initialPath` when router type is memory.
      const routeAssetPath = path.join(outputDir, 'js',
        `p_${routePath === '/' ? 'index' : routePath.replace(/^\//, '').replace(/\//g, '-')}.js`);
      if (fse.existsSync(routeAssetPath)) {
        fse.writeFileSync(routeAssetPath,
          `window.__ICE_APP_CONTEXT__=Object.assign(window.__ICE_APP_CONTEXT__||{}, {routePath: '${routePath}'});${
            fse.readFileSync(routeAssetPath, 'utf-8')}`);
      } else {
        logger.warn(`Can not find ${routeAssetPath} when inject initial path.`);
      }
    });
  }

  await applyHook('after.build.compile', {
    stats,
    isSuccessful,
    messages,
    taskConfigs,
    webpackConfigs,
    serverCompiler,
    serverEntryRef,
    output,
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
