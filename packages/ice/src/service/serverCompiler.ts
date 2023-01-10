import * as path from 'path';
import { esbuild } from '@ice/bundles';
import fse from 'fs-extra';
import fg from 'fast-glob';
import type { Config } from '@ice/webpack-config/esm/types';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { TaskConfig } from 'build-scripts';
import { getCompilerPlugins, getCSSModuleLocalIdent } from '@ice/webpack-config';
import type { ServerCompiler } from '../types/plugin.js';
import type { UserConfig } from '../types/userConfig.js';
import escapeLocalIdent from '../utils/escapeLocalIdent.js';
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
import { scanImports } from './analyze.js';
import type { DepsMetaData } from './preBundleCJSDeps.js';
import preBundleCJSDeps from './preBundleCJSDeps.js';

const logger = createLogger('server-compiler');

interface Options {
  rootDir: string;
  task: TaskConfig<Config>;
  command: string;
  server: UserConfig['server'];
  syntaxFeatures: UserConfig['syntaxFeatures'];
}

const { merge, difference } = lodash;

export function createServerCompiler(options: Options) {
  const { task, rootDir, command, server, syntaxFeatures } = options;
  const externals = task.config?.externals || {};
  const define = task.config?.define || {};
  const sourceMap = task.config?.sourceMap;
  const dev = command === 'start';

  // Filter empty alias.
  const ignores = [];
  const taskAlias = task.config?.alias || {};
  const alias: Record<string, string> = {};
  Object.keys(taskAlias).forEach((aliasKey) => {
    const value = taskAlias[aliasKey];
    if (value) {
      alias[aliasKey] = value;
    } else {
      ignores.push(aliasKey);
    }
  });

  const defineVars = {};
  // auto stringify define value
  Object.keys(define).forEach((key) => {
    defineVars[key] = JSON.stringify(define[key]);
  });

  const serverCompiler: ServerCompiler = async (customBuildOptions, {
    preBundle,
    swc,
    externalDependencies,
    compilationInfo,
    redirectImports,
    removeOutputs,
    runtimeDefineVars = {},
    enableEnv = false,
    transformEnv = true,
  } = {}) => {
    let depsMetadata: DepsMetaData;
    let swcOptions = merge({}, {
      // Only get the `compilationConfig` from task config.
      compilationConfig: {
        ...(task.config?.swcOptions?.compilationConfig || {}),
        // Force inline when use swc as a transformer.
        sourceMaps: sourceMap && 'inline',
      },
    }, swc);
    const enableSyntaxFeatures = syntaxFeatures && Object.keys(syntaxFeatures).some(key => syntaxFeatures[key]);
    const transformPlugins = getCompilerPlugins({
      ...task.config,
      fastRefresh: false,
      enableEnv,
      polyfill: false,
      swcOptions,
      redirectImports,
    }, 'esbuild');

    if (preBundle) {
      depsMetadata = await createDepsMetadata({
        task,
        alias,
        ignores,
        rootDir,
        // Pass transformPlugins only if syntaxFeatures is enabled
        plugins: enableSyntaxFeatures ? [
          transformPipePlugin({
            plugins: transformPlugins,
          }),
        ] : [],
      });
    }

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
      ...defineVars,
      ...runtimeDefineVars,
    };
    const expandedEnvs = getExpandedEnvs();
    // Add user defined envs.
    for (const [key, value] of Object.entries(expandedEnvs)) {
      define[`import.meta.env.${key}`] = JSON.stringify(value);
    }
    // Add process.env.
    Object.keys(process.env)
      .filter((key) => /^ICE_/.test(key) || key === 'NODE_ENV')
      .forEach((key) => {
        define[`import.meta.env.${key}`] = JSON.stringify(process.env[key]);
      });

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
      ...customBuildOptions,
      define,
      absWorkingDir: rootDir,
      external: Object.keys(externals),
      banner: customBuildOptions.platform === 'node' && server?.format !== 'cjs'
        ? {
            // See https://github.com/evanw/esbuild/issues/1921#issuecomment-1152991694
            js: 'import { createRequire } from \'module\';const require = createRequire(import.meta.url);',
          }
        : undefined,
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
          generateLocalIdentName: function (name: string, filename: string) {
            // Compatible with webpack css-loader.
            return escapeLocalIdent(getCSSModuleLocalIdent(filename, name));
          },
        }),
        compilationInfo && createAssetsPlugin(compilationInfo, rootDir),
        transformPipePlugin({
          plugins: [
            ...transformPlugins,
            // Plugin transformImportPlugin need after transformPlugins in case of it has onLoad lifecycle.
            dev && preBundle && depsMetadata && transformImportPlugin(
              depsMetadata,
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
      const esbuildResult = await esbuild.build(buildOptions);

      logger.debug('[esbuild]', `time cost: ${new Date().getTime() - startTime}ms`);

      const esm = server?.format === 'esm';
      const outJSExtension = esm ? '.mjs' : '.cjs';
      const serverEntry = path.join(rootDir, task.config.outputDir, SERVER_OUTPUT_DIR, `index${outJSExtension}`);

      if (removeOutputs && esbuildResult.metafile) {
        // build/server/a.mjs -> a.mjs
        const currentOutputFiles = Object.keys(esbuildResult.metafile.outputs)
          .map(output => output.replace(formatPath(`${path.relative(rootDir, buildOptions.outdir)}${path.sep}`), ''));
        const allOutputFiles = fg.sync('**', { cwd: buildOptions.outdir });
        const outdatedFiles = difference(allOutputFiles, currentOutputFiles);
        outdatedFiles.forEach(outdatedFile => fse.removeSync(path.join(buildOptions.outdir, outdatedFile)));
      }

      return {
        ...esbuildResult,
        serverEntry,
      };
    } catch (error) {
      logger.error(
        'Server compile error.',
        `\nEntryPoints: ${JSON.stringify(buildOptions.entryPoints)}`,
        `\n${error.message}`,
      );
      // TODO: Log esbuild options with namespace.
      // logger.debug('esbuild options: ', buildOptions);
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
}
/**
 *  Create dependencies metadata only when server entry is bundled to esm.
 */
async function createDepsMetadata({ rootDir, task, plugins, alias, ignores }: CreateDepsMetadataOptions) {
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
      if (!isExternalBuiltinDep(dep)) {
        preBundleDepsInfo[dep] = deps[dep];
      }
    }
    return preBundleDepsInfo;
  }
  // don't pre bundle the deps because they can run in node env.
  // For examples: react, react-dom, @ice/runtime
  const preBundleDepsInfo = filterPreBundleDeps(deps);
  const cacheDir = path.join(rootDir, CACHE_DIR);
  const ret = await preBundleCJSDeps({
    depsInfo: preBundleDepsInfo,
    cacheDir,
    taskConfig: task.config,
    alias,
    ignores,
    plugins,
  });

  return ret.metadata;
}
