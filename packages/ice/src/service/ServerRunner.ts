import * as path from 'path';
import fse from 'fs-extra';
import fg from 'fast-glob';
import { getCompilerPlugins } from '@ice/shared-config';
import moduleLexer from '@ice/bundles/compiled/es-module-lexer/index.js';
import MagicString from '@ice/bundles/compiled/magic-string/index.js';
import type { TaskConfig } from 'build-scripts';
import type { Config } from '@ice/shared-config/types';
import type { PluginBuild, OnResolveOptions, Plugin, OnLoadResult, OnResolveResult } from 'esbuild';
import emptyCSSPlugin from '../esbuild/emptyCSS.js';
import ignorePlugin from '../esbuild/ignore.js';
import cssModulesPlugin from '../esbuild/cssModules.js';
import createAssetsPlugin from '../esbuild/assets.js';
import externalPlugin from '../esbuild/external.js';
import transformPipePlugin from '../esbuild/transformPipe.js';
import type { CompilerOptions } from '../types/plugin.js';
import type { UserConfig } from '../types/userConfig.js';
import { logger } from '../utils/logger.js';
import getCSSModuleIdent from '../utils/getCSSModuleIdent.js';
import { resolveId as resolveWithAlias } from './analyze.js';
import Runner from './Runner.js';
import { RuntimeMeta } from './onDemandPreBundle.js';
import { filterAlias, getRuntimeDefination } from './serverCompiler.js';

interface InitOptions {
  rootDir: string;
  server: UserConfig['server'];
  csr: boolean;
  task: TaskConfig<Config>;
  getRoutesFile: () => string[];
  speedup: boolean;
}

type ResolveCallback = Parameters<PluginBuild['onResolve']>[1];
type LoadCallback = Parameters<PluginBuild['onLoad']>[1];

const FALLBACK_LOADERS = {
  '.json': 'json',
  '.txt': 'text',
};

function getPluginLifecycle(plugin: Plugin, compiler: 'onLoad'): [OnResolveOptions, LoadCallback][];
function getPluginLifecycle(plugin: Plugin, compiler: 'onResolve'): [OnResolveOptions, ResolveCallback][];
function getPluginLifecycle(plugin: Plugin, hookKey: 'onResolve' | 'onLoad') {
  // Load options is as same as resolve options.
  let lifecycles = [];
  const fakePluginBuild = new Proxy({}, {
    get: function (_, props) {
      if (props === hookKey) {
        return (options: OnResolveOptions, callback: ResolveCallback | LoadCallback) => {
          lifecycles.push([options, callback]);
        };
      } else {
        return () => {};
      }
    },
  });
  plugin.setup(fakePluginBuild as PluginBuild);
  return lifecycles;
}

const { init, parse } = moduleLexer;
async function transformJsxRuntime(source: string) {
  await init;
  const [imports] = parse(source);
  let s: MagicString | undefined;
  const str = () => s || (s = new MagicString(source));

  imports.forEach((imp) => {
    if (!imp.n) {
      return;
    }
    // JSX runtime is added after swc plugins
    // use es-module-lexer to replace the import statement.
    if (imp.n === '@ice/runtime/jsx-dev-runtime' || imp.n === '@ice/runtime/react/jsx-dev-runtime') {
      str().overwrite(
        imp.ss,
        imp.se,
        'const __ice_import_runtime__ = await __ice_import__("@ice/runtime/jsx-dev-runtime");' +
        'const _jsxDEV = __ice_import_runtime__.jsxDEV;' +
        'const _Fragment = __ice_import_runtime__.Fragment',
      );
    }
  });
  return s ? s.toString() : source;
}

class ServerRunner extends Runner {
  rootDir: string;
  server: UserConfig['server'];
  private compilationInfo: CompilerOptions['compilationInfo'];

  constructor({
    task,
    server,
    rootDir,
    csr,
    getRoutesFile,
    speedup,
  }: InitOptions) {
    const transformPlugins = getCompilerPlugins(rootDir, {
      ...task.config,
      fastRefresh: false,
      enableEnv: false,
      polyfill: false,
      getRoutesFile,
      swcOptions: {
        nodeTransform: true,
        // Remove all exports except pageConfig when ssr and ssg both are false.
        keepExports: csr ? ['pageConfig'] : null,
        compilationConfig: {
          jsc: {
            // https://node.green/#ES2020
            target: 'es2020',
            externalHelpers: false,
          },
        },
      },
    }, 'esbuild', { isServer: true });
    const taskConfig = task.config;
    const { alias, ignores } = filterAlias(taskConfig.alias || {});
    const define = getRuntimeDefination(taskConfig.define || {});
    const runtimeMeta = new RuntimeMeta({
      rootDir,
      alias,
      ignores,
      external: server.externals || [],
      define,
      taskConfig,
      speedup,
    });

    const esbuildPlugins = [
      emptyCSSPlugin(),
      externalPlugin({
        ignores,
        externalDependencies: true,
        format: 'esm',
        externals: server.externals,
      }),
      server?.ignores && ignorePlugin(server.ignores),
      cssModulesPlugin({
        extract: false,
        generateLocalIdentName: function (name: string, fileName: string) {
          return getCSSModuleIdent({
            rootDir,
            // ServerRunner only works in development mode.
            mode: 'development',
            fileName,
            localName: name,
            rule: speedup ? 'native' : 'loader',
            localIdentName: taskConfig.cssModules?.localIdentName,
          });
        },
      }),
      createAssetsPlugin(() => {
        return this.compilationInfo;
      }, rootDir),
      transformPipePlugin({
        plugins: transformPlugins,
      }),
    ].filter(Boolean);
    let firstResolve = true;
    const externals = [];
    super({
      rootDir,
      meta: {
        renderer: 'client',
        target: 'web',
      },
      resolveId: async (id, importer) => {
        // Call esbuild lifecycle `onResolve` of esbuild plugin.
        let resolvedId = id;
        let resolveNamespace = '';
        firstResolve = false;

        // Resolve aliased id.
        if (!path.isAbsolute(resolvedId)) {
          if (resolvedId.startsWith('.')) {
            resolvedId = path.resolve(path.dirname(importer), resolvedId);
          } else {
            const id = resolveWithAlias(resolvedId, task.config.alias || {});
            if (id) {
              resolvedId = id.startsWith('.') ? path.resolve(rootDir, id) : id;
            } else {
              resolveNamespace = 'empty-content';
            }
          }
        }

        for (const plugin of esbuildPlugins) {
          let res: OnResolveResult;
          const lifecycles = getPluginLifecycle(plugin, 'onResolve');
          for (const [options, callback] of lifecycles) {
            if (options && callback) {
              const { filter, namespace } = options;
              if (namespace ? namespace == resolveNamespace : filter && filter.test(resolvedId)) {
                try {
                  res = await callback({
                    path: resolvedId,
                    importer,
                    namespace: resolveNamespace,
                    resolveDir: path.dirname(importer),
                    // Add kind of entry-point or import-statement to distinguish the type of resolve.
                    kind: firstResolve ? 'entry-point' : 'import-statement',
                    pluginData: {},
                  });

                  if (res) {
                    const { path: resolvedPath, namespace: resolvedNamespace, external } = res;
                    resolvedId = resolvedPath || resolvedId;
                    resolveNamespace = resolvedNamespace || '';
                    if (external) {
                      externals.push(resolvedId);
                    }
                    break;
                  }
                } catch (err) {
                  logger.error(`Failed to resolve module ${id} from ${importer}, Esbuild name ${plugin.name}: ${err}`);
                  throw err;
                }
              }
            }
          }
          if (res) break;
        }

        // Glob specified file module aliased with absolute path.
        if (!path.extname(resolvedId) && path.isAbsolute(resolvedId)) {
          const basename = path.basename(resolvedId);
          const patterns = [`${basename}.{js,ts,jsx,tsx,mjs}`, `${basename}/index.{js,ts,jsx,tsx,mjs}`];
          const absoluteId = fg.sync(patterns, {
            cwd: path.dirname(resolvedId),
            absolute: true,
          })[0];

          if (absoluteId) {
            resolvedId = absoluteId;
          }
        }
        return {
          id: resolvedId,
          namespace: resolveNamespace,
        };
      },
      load: async (args) => {
        const id = args.path;

        if (externals.includes(id)) {
          return { externalize: id };
        } else {
          let code = '';

          // Call esbuild lifecycle `onLoad` of esbuild plugin.
          for (const plugin of esbuildPlugins) {
            let res: OnLoadResult;
            const lifecycles = getPluginLifecycle(plugin, 'onLoad');
            for (const [options, callback] of lifecycles) {
              const { filter, namespace } = options;
              // Remove suffix of id.
              const formatedId = id.replace(/\?\w+$/, '');
              if (namespace ? namespace == args.namespace : filter && filter.test(formatedId)) {
                try {
                  res = await callback({
                    namespace: '',
                    suffix: id.match(/(\?\w+)$/)?.[1] || '',
                    pluginData: {},
                    ...args,
                    path: formatedId,
                  });
                  // If res is undefined, it means the plugin does not handle the file, fallback to default handler.
                  if (!res && FALLBACK_LOADERS[path.extname(formatedId)]) {
                    res = {
                      loader: FALLBACK_LOADERS[path.extname(formatedId)],
                    };
                  }
                  if (res) {
                    const { contents, loader } = res;
                    if (['json', 'text'].includes(loader)) {
                      if (contents) {
                        code = `__ice_exports__.default = ${contents}`;
                      } else {
                        const contents = await fse.readFile(formatedId, 'utf-8');
                        code = `__ice_exports__.default = ${loader === 'text' ? JSON.stringify(contents) : contents}`;
                      }
                    } else {
                      code = typeof contents === 'string' ? contents : contents.toString();
                    }
                    break;
                  }
                } catch (err) {
                  logger.error(`Failed to load module ${id}, Esbuild name ${plugin.name}`);
                  throw err;
                }
              }
            }
            if (res) {
              break;
            }
          }
          if (!code && !path.isAbsolute(id)) {
            // If id is runtime dependency, bundle it and return externalized id.
            const bundlePath = await runtimeMeta.bundle(id);
            return { externalize: bundlePath };
          }
          return {
            code: await transformJsxRuntime(code),
          };
        }
      },
      define,
    });
  }

  addCompileData(compilationInfo: CompilerOptions['compilationInfo']) {
    this.compilationInfo = compilationInfo;
  }

  fileChanged(filePath: string) {
    this.moduleCache.delete(filePath);
  }
}

export default ServerRunner;
