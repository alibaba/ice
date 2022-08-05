import fs from 'fs';
import * as path from 'path';
import type { Plugin, PluginBuild, Loader } from 'esbuild';
import type { UnpluginOptions, UnpluginContext } from 'unplugin';

interface PluginOptions {
  plugins?: UnpluginOptions[];
  namespace?: string;
  filter?: RegExp;
}

const extToLoader: Record<string, Loader> = {
  '.js': 'js',
  '.mjs': 'js',
  '.cjs': 'js',
  '.jsx': 'jsx',
  '.ts': 'ts',
  '.cts': 'ts',
  '.mts': 'ts',
  '.tsx': 'tsx',
  '.css': 'css',
  '.less': 'css',
  '.stylus': 'css',
  '.scss': 'css',
  '.sass': 'css',
  '.json': 'json',
  '.txt': 'text',
};

export function guessLoader(id: string): Loader {
  return extToLoader[path.extname(id).toLowerCase()] || 'js';
}

/**
 * `load` and `transform` may return a sourcemap without toString and toUrl,
 * but esbuild needs them, we fix the two methods.
 */
export function fixSourceMap(map: any) {
  if (!('toString' in map)) {
    Object.defineProperty(map, 'toString', {
      enumerable: false,
      value: function toString() {
        return JSON.stringify(this);
      },
    });
  }
  if (!('toUrl' in map)) {
    Object.defineProperty(map, 'toUrl', {
      enumerable: false,
      value: function toUrl() {
        return `data:application/json;charset=utf-8;base64,${Buffer.from(this.toString()).toString('base64')}`;
      },
    });
  }
  return map;
}

const transformPipe = (options: PluginOptions = {}): Plugin => {
  return {
    name: 'esbuild-transform-pipe',
    setup(build: PluginBuild) {
      const { plugins = [], namespace = '', filter = /.*/ } = options;
      const errors = [];
      const warnings = [];

      // TODO: support unplugin context such as parse / emitFile
      const pluginContext: UnpluginContext = {
        error(message) { errors.push({ text: String(message) }); },
        warn(message) { warnings.push({ text: String(message) }); },
      };
      const pluginResolveIds = [];
      plugins.forEach(plugin => {
        // Call esbuild specific Logic like onResolve.
        plugin?.esbuild?.setup(build);
        if (plugin?.resolveId) {
          pluginResolveIds.push(plugin?.resolveId);
        }
      });
      if (pluginResolveIds.length > 0) {
        build.onResolve({ filter }, async (args) => {
          const isEntry = args.kind === 'entry-point';
          const res = await pluginResolveIds.reduce(async (resolveData, resolveId) => {
            const { path, external } = await resolveData;
            if (!external) {
              const result = await resolveId(path, isEntry ? undefined : args.importer, { isEntry });
              if (typeof result === 'string') {
                return { path: result };
              } else if (typeof result === 'object' && result !== null) {
                return { path: result.id, external: result.external };
              }
            }
            return resolveData;
          }, Promise.resolve({ path: args.path }));
          if (path.isAbsolute(res.path) || res.external) {
            return res;
          }
        });
      }
      build.onLoad({ filter, namespace }, async (args) => {
        const id = args.path;
        // it is required to forward `resolveDir` for esbuild to find dependencies.
        const resolveDir = path.dirname(args.path);
        const loader = guessLoader(id);
        const transformedResult = await plugins.reduce(async (prevData, plugin) => {
          const { contents } = await prevData;
          const { transform, transformInclude } = plugin;
          if (!transformInclude || transformInclude?.(id)) {
            let sourceCode = contents;
            let sourceMap = null;
            if (plugin.load) {
              const result = await plugin.load.call(pluginContext, id);
              if (typeof result === 'string') {
                sourceCode = result;
              } else if (typeof result === 'object' && result !== null) {
                sourceCode = result.code;
                sourceMap = result.map;
              }
            }
            if (!sourceCode) {
              // Caution: 'utf8' assumes the input file is not in binary.
              // If you want your plugin handle binary files, make sure to execute `plugin.load()` first.
              sourceCode = await fs.promises.readFile(args.path, 'utf8');
            }
            if (transform) {
              const result = await transform.call(pluginContext, sourceCode, id);
              if (typeof result === 'string') {
                sourceCode = result;
              } else if (typeof result === 'object' && result !== null) {
                sourceCode = result.code;
                sourceMap = result.map;
              }
            }
            if (sourceMap) {
              if (!sourceMap.sourcesContent || sourceMap.sourcesContent.length === 0) {
                sourceMap.sourcesContent = [sourceCode];
              }
              sourceMap = fixSourceMap(sourceMap);
              sourceCode += `\n//# sourceMappingURL=${sourceMap.toUrl()}`;
            }
            return { contents: sourceCode, resolveDir, loader };
          }
          return { contents, resolveDir, loader };
        }, Promise.resolve({ contents: null, resolveDir, loader }));
        // Make sure contents is not null when return.
        if (transformedResult.contents) {
          return transformedResult;
        }
      });
    },
  };
};

export default transformPipe;