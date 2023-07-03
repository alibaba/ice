import * as path from 'path';
import fg from 'fast-glob';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import { getWebpackConfig as getDefaultWebpackConfig } from '@ice/webpack-config';
import type { Context, TaskConfig } from 'build-scripts';
import type { Config } from '@ice/webpack-config/types';
import type { AppConfig } from '@ice/runtime/types';
import type { Configuration } from 'webpack';
import type ora from '@ice/bundles/compiled/ora/index.js';
import { getExpandedEnvs } from '../../utils/runtimeEnv.js';
import { getRouteExportConfig } from '../../service/config.js';
import { getFileHash } from '../../utils/hash.js';
import ServerRunnerPlugin from '../../webpack/ServerRunnerPlugin.js';
import ReCompilePlugin from '../../webpack/ReCompilePlugin.js';
import getServerCompilerPlugin from '../../utils/getServerCompilerPlugin.js';
import DataLoaderPlugin from '../../webpack/DataLoaderPlugin.js';
import type { ServerCompiler, GetAppConfig, GetRoutesConfig, ExtendsPluginAPI, GetDataloaderConfig } from '../../types/plugin.js';
import { IMPORT_META_RENDERER, IMPORT_META_TARGET, RUNTIME_TMP_DIR, SERVER_OUTPUT_DIR, WEB } from '../../constant.js';
import type RouteManifest from '../../utils/routeManifest.js';
import type { UserConfig } from '../../types/userConfig.js';
import type ServerRunner from '../../service/ServerRunner.js';
import type ServerCompilerPlugin from '../../webpack/ServerCompilerPlugin.js';

const { debounce } = lodash;

interface GetWebpackConfigOptions {
  serverCompiler: ServerCompiler;
  spinner: ora.Ora;
  appConfig: AppConfig;
  getRoutesConfig: GetRoutesConfig;
  getDataloaderConfig: GetDataloaderConfig;
  configFile: string;
  userConfig: UserConfig;
  routeManifest: RouteManifest;
  serverRunner?: ServerRunner;
}

type GetWebpackConfig = (
  context: Context<Config, ExtendsPluginAPI>,
  taskConfigs: TaskConfig<Config>[],
  options: GetWebpackConfigOptions
) => Promise<Configuration[]>;

interface DevOptions {
  context: Context<Config, ExtendsPluginAPI>;
  serverRunner?: ServerRunner;
  ensureRoutesConfig: () => Promise<void>;
  reCompile: (taskKey: string) => void;
  serverCompilerPlugin?: ServerCompilerPlugin;
}

const addDevPlugins = (webpackConfig: Configuration, options: DevOptions) => {
  const { serverRunner, ensureRoutesConfig, reCompile, context, serverCompilerPlugin } = options;
  const { dataCache, watch } = context.extendsPluginAPI;
  if (serverRunner) {
    webpackConfig.plugins.push(new ServerRunnerPlugin(
      serverRunner,
      ensureRoutesConfig,
    ));
  }

  // Add re-compile plugin
  webpackConfig.plugins.push(
    new ReCompilePlugin(reCompile, (files) => {
      // Only when routes file changed.
      const routeManifest = JSON.parse(dataCache.get('routes'))?.routeManifest || {};
      const routeFiles = Object.keys(routeManifest).map((key) => {
        const { file } = routeManifest[key];
        return `src/pages/${file}`;
      });
      return files.some((filePath) => routeFiles.some(routeFile => filePath.includes(routeFile)));
    }),
  );
  const debounceCompile = debounce(() => {
    serverCompilerPlugin?.buildResult?.context.rebuild();
    console.log('Document updated, try to reload page for latest html content.');
  }, 200);
  watch.addEvent([
    /src\/document(\/index)?(.js|.jsx|.tsx)/,
    (event: string) => {
      if (event === 'change') {
        debounceCompile();
      }
    },
  ]);
};

const getWebpackConfig: GetWebpackConfig = async (context, taskConfigs, options) => {
  const { configFile, serverRunner, serverCompiler } = options;
  const {
    rootDir,
    command,
    commandArgs,
    userConfig,
    getAllPlugin,
    extendsPluginAPI: {
      serverCompileTask,
      getRoutesFile,
      generator,
    },
  } = context;
  const { target = WEB } = commandArgs;
  // TODO: read config file form build-scripts context.
  const userConfigHash = await getFileHash(path.join(rootDir, fg.sync(configFile, { cwd: rootDir })[0]));

  const webpackConfigs = taskConfigs.map(({ config }) => {
    const { useDevServer, useDataLoader, server } = config;
    // If the target in the task config doesn't exit, use the target from cli command option.
    config.target ||= target;
    let webpackConfig = getDefaultWebpackConfig({
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
      getRoutesFile,
    });
    const { reCompile, ensureRoutesConfig } = getRouteExportConfig(rootDir);
    let serverCompilerPlugin: ServerCompilerPlugin;
    if (useDevServer && !serverRunner) {
      // If serverRunner is not provided, fallback to serverCompilerPlugin.
      const outputDir = webpackConfig.output.path;
      serverCompilerPlugin = getServerCompilerPlugin(serverCompiler, {
        rootDir,
        serverEntry: server?.entry,
        outputDir,
        serverCompileTask,
        userConfig,
        ensureRoutesConfig,
        runtimeDefineVars: {
          [IMPORT_META_TARGET]: JSON.stringify(target),
          [IMPORT_META_RENDERER]: JSON.stringify('server'),
        },
      });
      webpackConfig.plugins.push(serverCompilerPlugin);
    }
    if (command === 'start') {
      addDevPlugins(webpackConfig, { serverRunner, ensureRoutesConfig, reCompile, context, serverCompilerPlugin });
    }
    if (useDataLoader) {
      const frameworkExports = generator.getExportList('framework', target);

      webpackConfig.plugins.push(new DataLoaderPlugin({
        serverCompiler,
        target,
        rootDir,
        getAllPlugin,
        frameworkExports,
      }));
    }
    return webpackConfig;
  });

  return webpackConfigs;
};

export default getWebpackConfig;
