import getRspackConfig from '@ice/rspack-config';
import type { Configuration } from '@rspack/core';
import type { rspack as Rspack } from '@ice/bundles/esm/rspack.js';
import type { Config } from '@ice/shared-config/types';
import { getRouteExportConfig } from '../../service/config.js';
import {
  RUNTIME_TMP_DIR,
  IMPORT_META_TARGET,
  IMPORT_META_RENDERER,
  CSS_MODULES_LOCAL_IDENT_NAME,
  CSS_MODULES_LOCAL_IDENT_NAME_DEV,
} from '../../constant.js';
import { getReCompilePlugin, getServerPlugin, getSpinnerPlugin } from '../config/plugins.js';
import { getExpandedEnvs } from '../../utils/runtimeEnv.js';
import DataLoaderPlugin from '../../webpack/DataLoaderPlugin.js';
import type { BundlerOptions, Context } from '../types.js';

type GetConfig = (
  context: Context,
  options: BundlerOptions,
  rspack: typeof Rspack,
) => Promise<Configuration[]>;

const getConfig: GetConfig = async (context, options, rspack) => {
  const {
    taskConfigs,
    spinner,
    routeManifest,
    hooksAPI: {
      serverRunner,
      serverCompiler,
    },
  } = options;
  const {
    rootDir,
    userConfig,
    getAllPlugin,
    extendsPluginAPI: {
      serverCompileTask,
      getRoutesFile,
      generator,
    },
  } = context;
  const { reCompile, ensureRoutesConfig } = getRouteExportConfig(rootDir);
  const getPlugins = (taskConfig: Config): Configuration['plugins'] => {
    const { target, outputDir, useDataLoader, server } = taskConfig;
    return [
      // Add spinner for webpack task.
      getSpinnerPlugin(spinner),
      // Add Server runner plugin.
      getServerPlugin({
        serverRunner,
        ensureRoutesConfig,
        serverCompiler,
        target,
        rootDir,
        serverEntry: server?.entry,
        outputDir,
        serverCompileTask,
        userConfig,
      }),
      // Add ReCompile plugin when routes config changed.
      getReCompilePlugin(reCompile, routeManifest),
      // Add DataLoader plugin.
      useDataLoader && new DataLoaderPlugin({
        serverCompiler,
        target,
        rootDir,
        getAllPlugin,
        frameworkExports: generator.getExportList('framework', target),
      }),
    ].filter(Boolean);
  };
  return taskConfigs.map(({ config }) => {
    const plugins = getPlugins(config);
    return getRspackConfig({
      rootDir,
      rspack,
      runtimeTmpDir: RUNTIME_TMP_DIR,
      runtimeDefineVars: {
        [IMPORT_META_TARGET]: JSON.stringify(config.target),
        [IMPORT_META_RENDERER]: JSON.stringify('client'),
      },
      getRoutesFile,
      getExpandedEnvs,
      localIdentName: config.mode === 'development' ? CSS_MODULES_LOCAL_IDENT_NAME_DEV : CSS_MODULES_LOCAL_IDENT_NAME,
      taskConfig: {
        ...config,
        plugins: (config.plugins || []).concat(plugins),
      },
    });
  });
};


export default getConfig;
