import type { BuildOptions } from 'esbuild';
import unplugin from '@ice/bundles/compiled/unplugin/index.js';
import type { UnpluginOptions } from '@ice/bundles/compiled/unplugin/index.js';
import type { Configuration } from 'webpack';
import type { Config } from './types.js';
import compilationPlugin from './unPlugins/compilation.js';
import compileExcludes from './compileExcludes.js';

type Compiler = 'webpack' | 'esbuild';

const { createUnplugin } = unplugin;
function getPluginTransform(plugin: UnpluginOptions, type: 'esbuild' | 'webpack') {
  const { transform } = plugin;
  if (transform) {
    return {
      ...plugin,
      transform(code: string, id: string) {
        return transform.call(this, code, id, {
          isServer: type === 'esbuild',
        });
      },
    } as UnpluginOptions;
  }

  return plugin;
}

function transformInclude(id: string) {
  // Ingore binary file to be transformed.
  return !!id.match(/\.(js|jsx|ts|tsx|mjs|mts|css|less|scss)$/);
}

function getCompilerPlugins(config: Config, compiler: 'webpack'): Configuration['plugins'];
function getCompilerPlugins(config: Config, compiler: 'esbuild'): BuildOptions['plugins'];
function getCompilerPlugins(config: Config, compiler: Compiler) {
  const {
    sourceMap,
    transformPlugins = [],
    transforms = [],
    mode,
    compileIncludes,
    swcOptions,
    fastRefresh,
    cacheDir,
    polyfill,
    env,
  } = config;
  const compilerPlugins = [];

  // Add custom transform before swc compilation so the source code can be got before transformed.
  compilerPlugins.push(
    ...(transformPlugins.filter(({ enforce }) => !enforce || enforce === 'pre') || []),
    ...transforms.map((transform, index) => ({ name: `transform_${index}`, transform, transformInclude })),
  );
  // Use webpack loader instead of webpack plugin to do the compilation.
  // Reason: https://github.com/unjs/unplugin/issues/154
  if (swcOptions && compiler !== 'webpack') {
    compilerPlugins.push(compilationPlugin({
      cacheDir,
      sourceMap,
      fastRefresh,
      mode,
      compileIncludes,
      compileExcludes,
      swcOptions,
      polyfill,
      env,
    }));
  }

  compilerPlugins.push(
    ...(transformPlugins.filter(({ enforce }) => enforce === 'post') || []),
  );

  return compiler === 'webpack'
    // Plugins will be transformed as webpack loader, the execute order of webpack loader is reversed.
    ? compilerPlugins.reverse().map(plugin => createUnplugin(() => getPluginTransform(plugin, 'webpack')).webpack())
    : compilerPlugins.map(plugin => getPluginTransform(plugin, 'esbuild'));
}

export default getCompilerPlugins;
