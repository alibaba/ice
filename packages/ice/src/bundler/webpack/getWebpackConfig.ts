import path from 'path';
import webpack from '@ice/bundles/compiled/webpack/index.js';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import { getWebpackConfig as getDefaultWebpackConfig } from '@ice/webpack-config';
import type { Configuration } from 'webpack';
import ReactServerWebpackPlugin from '@ice/bundles/compiled/react-server-dom-webpack/plugin.js';
import { getExpandedEnvs } from '../../utils/runtimeEnv.js';
import { getRouteExportConfig } from '../../service/config.js';
import { getFileHash } from '../../utils/hash.js';
import DataLoaderPlugin from '../../webpack/DataLoaderPlugin.js';
import { IMPORT_META_RENDERER, IMPORT_META_TARGET, RUNTIME_TMP_DIR, WEB } from '../../constant.js';
import { getReCompilePlugin, getServerPlugin, getSpinnerPlugin } from '../config/plugins.js';
import type RouteManifest from '../../utils/routeManifest.js';
import type ServerRunnerPlugin from '../../webpack/ServerRunnerPlugin.js';
import type ServerCompilerPlugin from '../../webpack/ServerCompilerPlugin.js';
import type { BundlerOptions, Context } from '../types.js';

const { debounce } = lodash;

type GetWebpackConfig = (
  context: Context,
  options: BundlerOptions
) => Promise<Configuration[]>;

interface DevOptions {
  context: Context;
  routeManifest: RouteManifest;
  reCompile: (taskKey: string) => void;
  serverCompilerPlugin?: ServerCompilerPlugin | ServerRunnerPlugin;
}

const addDevPlugins = (webpackConfig: Configuration, options: DevOptions) => {
  const { reCompile, context, routeManifest, serverCompilerPlugin } = options;
  const { watch } = context.extendsPluginAPI;
  // Add re-compile plugin
  webpackConfig.plugins.push(
    getReCompilePlugin(reCompile, routeManifest),
  );
  const debounceCompile = debounce(() => {
    (serverCompilerPlugin as ServerCompilerPlugin)?.buildResult?.context.rebuild();
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

const getWebpackConfig: GetWebpackConfig = async (context, options) => {
  const { hooksAPI: { serverRunner, serverCompiler }, spinner, taskConfigs, routeManifest } = options;
  const {
    rootDir,
    command,
    commandArgs,
    userConfig,
    getAllPlugin,
    configFilePath,
    extendsPluginAPI: {
      serverCompileTask,
      getRoutesFile,
      generator,
    },
  } = context;
  const { target = WEB } = commandArgs;
  const userConfigHash = await getFileHash(configFilePath);

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
    const outputDir = webpackConfig.output.path;
    const serverCompilerPlugin = useDevServer && getServerPlugin({
      serverRunner,
      ensureRoutesConfig,
      serverCompiler,
      target,
      rootDir,
      serverEntry: server?.entry,
      outputDir,
      serverCompileTask,
      userConfig,
    });
    if (serverCompilerPlugin) {
      webpackConfig.plugins.push(serverCompilerPlugin);
    }

    if (command === 'start') {
      addDevPlugins(webpackConfig, { routeManifest, reCompile, context, serverCompilerPlugin });
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
    // Add spinner for webpack task.
    webpackConfig.plugins.push(getSpinnerPlugin(spinner));
    if (userConfig.rsc) {
      webpackConfig.plugins.push(new ReactServerWebpackPlugin({
        isServer: false,
        clientReferences: [{
          directory: path.join(rootDir, 'src'),
          recursive: true,
          include: /\.(js|ts|jsx|tsx)$/,
          exclude: /types.ts|.d.ts/,
        }],
      }));
    }

    return webpackConfig;
  });

  return webpackConfigs;
};

export default getWebpackConfig;
