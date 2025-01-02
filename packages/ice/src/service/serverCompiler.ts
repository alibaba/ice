import * as path from 'path';
import { esbuild } from '@ice/bundles';
import fse from 'fs-extra';
import fg from 'fast-glob';
import { isNodeBuiltin } from 'mlly';
import type { Config } from '@ice/shared-config/types';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { TaskConfig } from 'build-scripts';
import { getCompilerPlugins } from '@ice/shared-config';
import type { ServerCompiler } from '../types/plugin.js';
import type { UserConfig } from '../types/userConfig.js';
import cssModulesPlugin from '../esbuild/cssModules.js';
import externalPlugin from '../esbuild/external.js';
import ignorePlugin from '../esbuild/ignore.js';
import createAssetsPlugin from '../esbuild/assets.js';
import { CACHE_DIR, SERVER_OUTPUT_DIR } from '../constant.js';
import emptyCSSPlugin from '../esbuild/emptyCSS.js';
import transformImportPlugin from '../esbuild/transformImport.js';
import transformPipePlugin from '../esbuild/transformPipe.js';
import isExternalBuiltinDep from '../utils/isExternalBuiltinDep.js';
import getServerEntry from '../utils/getServerEntry.js';
import type { DepScanData } from '../esbuild/scan.js';
import formatPath from '../utils/formatPath.js';
import { createLogger } from '../utils/logger.js';
import { getExpandedEnvs } from '../utils/runtimeEnv.js';
import getCSSModuleIdent from '../utils/getCSSModuleIdent.js';
import { scanImports } from './analyze.js';
import type { PreBundleDepsMetaData } from './preBundleDeps.js';
import preBundleDeps from './preBundleDeps.js';
import { WebpackServerCompiler } from './webpackServerCompiler/compiler.js';
import VirualAssetPlugin from './webpackServerCompiler/virtualAssetPlugin.js';

const logger = createLogger('server-compiler');

interface Options {
  rootDir: string;
  task: TaskConfig<Config>;
  command: string;
  server: UserConfig['server'];
  syntaxFeatures: UserConfig['syntaxFeatures'];
  getRoutesFile: () => string[];
  speedup: boolean;
}

const { merge, difference } = lodash;

export const filterAlias = (taskAlias: TaskConfig<Config>['config']['alias']) => {
  // Filter empty alias.
  const ignores: string[] = [];
  const alias: Record<string, string> = {};
  Object.keys(taskAlias).forEach((aliasKey) => {
    const value = taskAlias[aliasKey];
    if (value) {
      alias[aliasKey] = value;
    } else {
      ignores.push(aliasKey);
    }
  });
  return { alias, ignores };
};

export const getRuntimeDefination = (
  defineVars: Record<string, string | boolean> = {},
  runtimeVars: Record<string, string> = {},
  transformEnv = true,
) => {
  const stringifiedDefine = {};
  const runtimeDefineVars = {
    ...runtimeVars,
  };
  // esbuild only receive the string type of replacement expressions, so we need to transform the boolean to string.
  // link: https://esbuild.github.io/api/#define
  Object.keys(defineVars).forEach((key) => {
    stringifiedDefine[key] = typeof defineVars[key] === 'string' ? defineVars[key] : JSON.stringify(defineVars[key]);
  });
  // get runtime variable for server build
  Object.keys(process.env).forEach((key) => {
    // Do not transform env when bundle client side code.
    if (/^ICE_CORE_/i.test(key) && transformEnv) {
      // in server.entry
      runtimeDefineVars[`__process.env.${key}__`] = JSON.stringify(process.env[key]);
    } else if (/^ICE_/i.test(key)) {
      runtimeDefineVars[`process.env.${key}`] = JSON.stringify(process.env[key]);
    }
  });
  const define = {
    ...stringifiedDefine,
    ...runtimeDefineVars,
  };
  const expandedEnvs = getExpandedEnvs();
  // Add user defined envs.
  for (const [key, value] of Object.entries(expandedEnvs)) {
    define[`import.meta.env.${key}`] = JSON.stringify(value);
  }
  return define;
};

export function createServerCompiler(options: Options) {
  const { task, rootDir, command, speedup, server, syntaxFeatures, getRoutesFile } = options;
  const externals = task.config?.externals || {};
  const sourceMap = task.config?.sourceMap;
  const dev = command === 'start';

  // Filter empty alias.
  const { ignores, alias } = filterAlias(task.config?.alias || {});

  const serverCompiler: ServerCompiler = async (
    customBuildOptions,
    {
      preBundle,
      swc,
      externalDependencies,
      compilationInfo,
      redirectImports,
      removeOutputs,
      runtimeDefineVars = {},
      enableEnv = false,
      transformEnv = true,
      isServer = true,
    } = {},
  ) => {
    let preBundleDepsMetadata: PreBundleDepsMetaData;
    let swcOptions = merge(
      {},
      {
        // Only get the `compilationConfig` from task config.
        compilationConfig: getCompilationConfig(),
      },
      swc,
    );
    function getCompilationConfig() {
      const customCompilationConfig = task.config?.swcOptions?.compilationConfig || {};
      const getConfig =
        typeof customCompilationConfig === 'function' ? customCompilationConfig : () => customCompilationConfig;

      return (source: string, id: string) => {
        return {
          ...getConfig(source, id),
          sourceMaps: !!sourceMap,
        };
      };
    }
    const enableSyntaxFeatures = syntaxFeatures && Object.keys(syntaxFeatures).some((key) => syntaxFeatures[key]);
    const transformPlugins = getCompilerPlugins(
      rootDir,
      {
        ...task.config,
        fastRefresh: false,
        enableEnv,
        polyfill: false,
        swcOptions,
        redirectImports,
        getRoutesFile,
      },
      'esbuild',
      { isServer },
    );
    const transformWebpackPlugins = getCompilerPlugins(
      rootDir,
      {
        ...task.config,
        fastRefresh: false,
        enableEnv,
        polyfill: false,
        swcOptions,
        redirectImports,
        getRoutesFile,
      },
      'webpack',
      { isServer },
    );
    const define = getRuntimeDefination(task.config?.define || {}, runtimeDefineVars, transformEnv);
    if (preBundle) {
      const plugins = [
        // Add assets plugin for pre-bundle in case of third-party library requires assets.
        compilationInfo && createAssetsPlugin(compilationInfo, rootDir),
      ];
      if (enableSyntaxFeatures) {
        plugins.push(
          transformPipePlugin({
            plugins: transformPlugins,
          }),
        );
      }
      preBundleDepsMetadata = await createPreBundleDepsMetadata({
        task,
        alias,
        ignores,
        rootDir,
        define,
        speedup,
        external: Object.keys(externals),
        // Pass transformPlugins only if syntaxFeatures is enabled
        plugins,
      });
    }
    const format = customBuildOptions?.format || 'esm';
    let buildOptions: esbuild.BuildOptions = {
      bundle: true,
      format,
      target: 'node12.20.0',
      alias,
      // enable JSX syntax in .js files by default for compatible with migrate project
      // while it is not recommended
      loader: { '.js': 'jsx' },
      jsx: 'automatic',
      sourcemap: typeof sourceMap === 'boolean'
      // Transform sourceMap for esbuild.
      ? sourceMap : (sourceMap.includes('inline') ? 'inline' : !!sourceMap),
      banner:
        customBuildOptions.platform === 'node' && server?.format !== 'cjs'
          ? {
              // See https://github.com/evanw/esbuild/issues/1921#issuecomment-1152991694
              js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
            }
          : undefined,
      ...customBuildOptions,
      absWorkingDir: rootDir,
      define,
      external: Object.keys(externals),
      plugins: [
        ...(customBuildOptions.plugins || []),
        emptyCSSPlugin(),
        externalPlugin({
          ignores,
          externalDependencies: externalDependencies ?? !server.bundle,
          format,
          externals: server.externals,
        }),
        server?.ignores && ignorePlugin(server.ignores),
        cssModulesPlugin({
          extract: false,
          generateLocalIdentName: function (name: string, fileName: string) {
            // Compatible with webpack css-loader.
            return getCSSModuleIdent({
              rootDir,
              mode: dev ? 'development' : 'production',
              fileName,
              localName: name,
              rule: speedup ? 'native' : 'loader',
              localIdentName: task.config.cssModules?.localIdentName,
            });
          },
        }),
        compilationInfo && createAssetsPlugin(compilationInfo, rootDir),
        transformPipePlugin({
          plugins: [
            ...transformPlugins,
            // Plugin transformImportPlugin need after transformPlugins in case of it has onLoad lifecycle.
            dev &&
              preBundle &&
              preBundleDepsMetadata &&
              transformImportPlugin(
                preBundleDepsMetadata,
                path.join(rootDir, task.config.outputDir, SERVER_OUTPUT_DIR),
              ),
          ].filter(Boolean),
        }),
      ].filter(Boolean),
    };
    if (typeof task.config?.server?.buildOptions === 'function') {
      buildOptions = task.config.server.buildOptions(buildOptions);
    }

    const startTime = new Date().getTime();
    logger.debug('[esbuild]', `start compile for: ${JSON.stringify(buildOptions.entryPoints)}`);

    try {
      let esbuildResult: esbuild.BuildResult;
      let context: esbuild.BuildContext;
      if (dev) {
        context = await esbuild.context(buildOptions);
        esbuildResult = await context.rebuild();
      } else {
        // esbuildResult = await esbuild.build(buildOptions);

        if (Array.isArray(buildOptions.entryPoints)) {
          esbuildResult = await esbuild.build(buildOptions);
        } else {
          const webpackServerCompiler = new WebpackServerCompiler({
            ...buildOptions,
            plugins: [
              compilationInfo && new VirualAssetPlugin({ compilationInfo, rootDir }),
              ...transformWebpackPlugins,
            ].filter(Boolean),
          });
          esbuildResult = (await webpackServerCompiler.build())?.compilation;
        }
      }

      logger.debug('[esbuild]', `time cost: ${new Date().getTime() - startTime}ms`);

      const esm = server?.format === 'esm';
      const outJSExtension = esm ? '.mjs' : '.cjs';
      const serverEntry = path.join(rootDir, task.config.outputDir, SERVER_OUTPUT_DIR, `index${outJSExtension}`);

      if (removeOutputs && esbuildResult.metafile) {
        // build/server/a.mjs -> a.mjs
        const currentOutputFiles = Object.keys(esbuildResult.metafile.outputs).map((output) =>
          output.replace(formatPath(`${path.relative(rootDir, buildOptions.outdir)}${path.sep}`), ''),
        );
        const allOutputFiles = fg.sync('**', { cwd: buildOptions.outdir });
        const outdatedFiles = difference(allOutputFiles, currentOutputFiles);
        outdatedFiles.forEach((outdatedFile) => fse.removeSync(path.join(buildOptions.outdir, outdatedFile)));
      }

      return {
        ...esbuildResult,
        context,
        serverEntry,
      };
    } catch (error) {
      logger.briefError(
        'Server compiled with errors.',
        `\nEntryPoints: ${JSON.stringify(buildOptions.entryPoints)}`,
        `\n${error.message}`,
      );
      logger.debug(error.stack);
      return {
        error: error as Error,
      };
    }
  };
  return serverCompiler;
}

interface CreateDepsMetadataOptions {
  rootDir: string;
  task: TaskConfig<Config>;
  plugins: esbuild.Plugin[];
  alias: Record<string, string>;
  ignores: string[];
  define: esbuild.BuildOptions['define'];
  external: esbuild.BuildOptions['external'];
  speedup: boolean;
}
/**
 *  Create dependencies metadata only when server entry is bundled to esm.
 */
async function createPreBundleDepsMetadata({
  rootDir,
  task,
  plugins,
  alias,
  ignores,
  define,
  external,
  speedup,
}: CreateDepsMetadataOptions) {
  const serverEntry = getServerEntry(rootDir, task.config?.server?.entry);
  const deps = await scanImports([serverEntry], {
    rootDir,
    alias,
    ignores,
    plugins,
  });

  function filterPreBundleDeps(deps: Record<string, DepScanData>) {
    const preBundleDepsInfo = {};
    for (const dep in deps) {
      const { name } = deps[dep];
      // Filter the deps which do not aliased and is node builtin module.
      const isNodeBuiltinDep = name === dep && isNodeBuiltin(dep);
      if (!isExternalBuiltinDep(dep) && !isNodeBuiltinDep) {
        preBundleDepsInfo[dep] = deps[dep];
      }
    }
    return preBundleDepsInfo;
  }
  // don't pre bundle the deps because they can run in node env.
  // For examples: react, react-dom, @ice/runtime
  const preBundleDepsInfo = filterPreBundleDeps(deps);
  const cacheDir = path.join(rootDir, CACHE_DIR);
  const ret = await preBundleDeps(preBundleDepsInfo, {
    rootDir,
    cacheDir,
    taskConfig: task.config,
    alias,
    ignores,
    plugins,
    define,
    external,
    speedup,
  });

  return ret.metadata;
}
