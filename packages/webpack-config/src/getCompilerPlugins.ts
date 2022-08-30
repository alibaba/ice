import type { Config } from '@ice/types';
import type { BuildOptions } from 'esbuild';
import { createUnplugin } from 'unplugin';
import type { UnpluginOptions } from 'unplugin';
import compilationPlugin from './unPlugins/compilation.js';
import compileExcludes from './compileExcludes.js';
import type { WebpackConfig } from './index.js';

type Compiler = 'webpack' | 'esbuild';

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

function getCompilerPlugins(config: Config, compiler: 'webpack'): WebpackConfig['plugins'];
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
  } = config;
  const compilerPlugins = [];

  // Add custom transform before swc compilation so the source code can be got before transformed.
  compilerPlugins.push(
    ...(transformPlugins.filter(({ enforce }) => !enforce || enforce === 'pre') || []),
    ...transforms.map((transform, index) => ({ name: `transform_${index}`, transform })),
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
