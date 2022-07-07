import * as path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import * as fs from 'fs';
import consola from 'consola';
import esbuild from 'esbuild';
import type { Config } from '@ice/types';
import type { ServerCompiler } from '@ice/types/esm/plugin.js';
import type { TaskConfig } from 'build-scripts';
import { getCompilerPlugins } from '@ice/webpack-config';
import escapeLocalIdent from '../utils/escapeLocalIdent.js';
import cssModulesPlugin from '../esbuild/cssModules.js';
import aliasPlugin from '../esbuild/alias.js';
import createAssetsPlugin from '../esbuild/assets.js';
import { ASSETS_MANIFEST, CACHE_DIR, SERVER_ENTRY } from '../constant.js';
import emptyCSSPlugin from '../esbuild/emptyCSS.js';
import createDepRedirectPlugin from '../esbuild/depRedirect.js';
import isExternalBuiltinDep from '../utils/isExternalBuiltinDep.js';
import { scanImports } from './analyze.js';
import preBundleCJSDeps from './preBundleCJSDeps.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface Options {
  rootDir: string;
  task: TaskConfig<Config>;
  command: string;
  serverBundle: boolean;
}

export function createServerCompiler(options: Options) {
  const { task, rootDir, command, serverBundle } = options;
  const { config } = task;

  const alias = (task.config?.alias || {}) as Record<string, string | false>;
  const assetsManifest = path.join(rootDir, ASSETS_MANIFEST);
  const define = task.config?.define || {};
  const dev = command === 'start';

  const defineVars = {};
  // auto stringify define value
  Object.keys(define).forEach((key) => {
    defineVars[key] = JSON.stringify(define[key]);
  });

  // get runtime variable for server build
  const runtimeDefineVars = {};
  Object.keys(process.env).forEach((key) => {
    if (/^ICE_CORE_/i.test(key)) {
      // in server.entry
      runtimeDefineVars[`__process.env.${key}__`] = JSON.stringify(process.env[key]);
    } else if (/^ICE_/i.test(key)) {
      runtimeDefineVars[`process.env.${key}`] = JSON.stringify(process.env[key]);
    }
  });

  const serverCompiler: ServerCompiler = async (buildOptions, swcOptions) => {
    const serverEntry = path.join(rootDir, SERVER_ENTRY);
    let metadata;
    if (buildOptions?.format === 'esm') {
      const deps = await scanImports([serverEntry], {
        rootDir,
        alias: (task.config?.alias || {}) as Record<string, string | false>,
      });

      function filterPreBundleDeps(deps: Record<string, string>) {
        const preBundleDepsInfo = {};
        for (const dep in deps) {
          if (!isExternalBuiltinDep(dep, buildOptions?.format)) {
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
        rootDir,
        cacheDir,
        taskConfig: task.config,
      });
      metadata = ret.metadata;
    }

    const transformPlugins = getCompilerPlugins({
      ...config,
      fastRefresh: false,
      swcOptions,
    }, 'esbuild');

    const startTime = new Date().getTime();
    consola.debug('[esbuild]', `start compile for: ${buildOptions.entryPoints}`);
    const define = {
      // ref: https://github.com/evanw/esbuild/blob/master/CHANGELOG.md#01117
      // in esm, this in the global should be undefined. Set the following config to avoid warning
      this: undefined,
      ...defineVars,
      ...runtimeDefineVars,
    };
    const buildResult = await esbuild.build({
      bundle: true,
      format: 'esm',
      target: 'node12.20.0',
      // enable JSX syntax in .js files by default for compatible with migrate project
      // while it is not recommended
      loader: { '.js': 'jsx' },
      inject: [path.resolve(__dirname, '../polyfills/react.js')],
      ...buildOptions,
      define,
      plugins: [
        ...(buildOptions.plugins || []),
        emptyCSSPlugin(),
        dev && buildOptions?.format === 'esm' && createDepRedirectPlugin(metadata),
        aliasPlugin({
          alias,
          serverBundle,
          format: buildOptions?.format || 'esm',
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
        ...transformPlugins,
      ].filter(Boolean),
    });
    consola.debug('[esbuild]', `time cost: ${new Date().getTime() - startTime}ms`);
    return buildResult;
  };
  return serverCompiler;
}


