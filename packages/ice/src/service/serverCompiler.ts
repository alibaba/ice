import * as path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import * as fs from 'fs';
import consola from 'consola';
import esbuild from 'esbuild';
import type { Config, UserConfig } from '@ice/types';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import lodash from '@ice/bundles/compiled/lodash/index.js';
import type { TaskConfig } from 'build-scripts';
import { getCompilerPlugins } from '@ice/webpack-config';
import escapeLocalIdent from '../utils/escapeLocalIdent.js';
import cssModulesPlugin from '../esbuild/cssModules.js';
import aliasPlugin from '../esbuild/alias.js';
import createAssetsPlugin from '../esbuild/assets.js';
import { ASSETS_MANIFEST, CACHE_DIR, SERVER_OUTPUT_DIR } from '../constant.js';
import emptyCSSPlugin from '../esbuild/emptyCSS.js';
import transformImportPlugin from '../esbuild/transformImport.js';
import transformPipePlugin from '../esbuild/transformPipe.js';
import isExternalBuiltinDep from '../utils/isExternalBuiltinDep.js';
import getServerEntry from '../utils/getServerEntry.js';
import type { DepScanData } from '../esbuild/scan.js';
import { scanImports } from './analyze.js';
import type { DepsMetaData } from './preBundleCJSDeps.js';
import preBundleCJSDeps from './preBundleCJSDeps.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface Options {
  rootDir: string;
  task: TaskConfig<Config>;
  command: string;
  server: UserConfig['server'];
  syntaxFeatures: UserConfig['syntaxFeatures'];
}

const { merge } = lodash;
export function createServerCompiler(options: Options) {
  const { task, rootDir, command, server, syntaxFeatures } = options;

  const alias = task.config?.alias || {};
  const externals = task.config?.externals || {};
  const assetsManifest = path.join(rootDir, ASSETS_MANIFEST);
  const define = task.config?.define || {};
  const sourceMap = task.config?.sourceMap;
  const dev = command === 'start';

  const defineVars = {};
  // auto stringify define value
  Object.keys(define).forEach((key) => {
    defineVars[key] = JSON.stringify(define[key]);
  });

  const serverCompiler: ServerCompiler = async (customBuildOptions, {
    preBundle,
    swc,
    externalDependencies,
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
      swcOptions,
    }, 'esbuild');

    if (preBundle) {
      depsMetadata = await createDepsMetadata({
        task,
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
    const runtimeDefineVars = {};
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
      // ref: https://github.com/evanw/esbuild/blob/master/CHANGELOG.md#01117
      // in esm, this in the global should be undefined. Set the following config to avoid warning
      this: undefined,
      ...defineVars,
      ...runtimeDefineVars,
    };
    const format = customBuildOptions?.format || 'esm';

    let buildOptions: esbuild.BuildOptions = {
      bundle: true,
      format,
      target: 'node12.20.0',
      // enable JSX syntax in .js files by default for compatible with migrate project
      // while it is not recommended
      loader: { '.js': 'jsx' },
      inject: [path.resolve(__dirname, '../polyfills/react.js')],
      sourcemap: typeof sourceMap === 'boolean'
        // Transform sourceMap for esbuild.
        ? sourceMap : (sourceMap.includes('inline') ? 'inline' : !!sourceMap),
      ...customBuildOptions,
      define,
      external: Object.keys(externals),
      plugins: [
        ...(customBuildOptions.plugins || []),
        emptyCSSPlugin(),
        aliasPlugin({
          alias,
          externalDependencies: externalDependencies ?? !server.bundle,
          format,
        }),
        cssModulesPlugin({
          extract: false,
          generateLocalIdentName: function (name: string, filename: string) {
            const hash = createHash('md4');
            hash.update(Buffer.from(filename + name, 'utf8'));
            return escapeLocalIdent(`${name}--${hash.digest('base64').slice(0, 8)}`);
          },
        }),
        fs.existsSync(assetsManifest) && createAssetsPlugin(assetsManifest, rootDir),
        transformPipePlugin({
          plugins: [
            ...transformPlugins,
            // Plugin transformImportPlugin need after transformPlugins in case of it has onLoad lifecycle.
            dev && preBundle && transformImportPlugin(depsMetadata),
          ].filter(Boolean),
        }),
      ].filter(Boolean),

    };
    if (typeof task.config?.server?.buildOptions === 'function') {
      buildOptions = task.config.server.buildOptions(buildOptions);
    }

    const startTime = new Date().getTime();
    consola.debug('[esbuild]', `start compile for: ${buildOptions.entryPoints}`);

    const esbuildResult = await esbuild.build(buildOptions);

    consola.debug('[esbuild]', `time cost: ${new Date().getTime() - startTime}ms`);

    const esm = server?.format === 'esm';
    const outJSExtension = esm ? '.mjs' : '.cjs';
    const serverEntry = path.join(rootDir, task.config.outputDir, SERVER_OUTPUT_DIR, `index${outJSExtension}`);

    return {
      ...esbuildResult,
      serverEntry,
    };
  };
  return serverCompiler;
}

interface CreateDepsMetadataOptions {
  rootDir: string;
  task: TaskConfig<Config>;
  plugins: esbuild.Plugin[];
}
/**
 *  Create dependencies metadata only when server entry is bundled to esm.
 */
async function createDepsMetadata({ rootDir, task, plugins }: CreateDepsMetadataOptions) {
  const serverEntry = getServerEntry(rootDir, task.config?.server?.entry);

  const deps = await scanImports([serverEntry], {
    rootDir,
    alias: (task.config?.alias || {}) as Record<string, string | false>,
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
    plugins,
  });

  return ret.metadata;
}
