import type { Config } from '@ice/types';
import type { BuildOptions } from 'esbuild';
import { createUnplugin } from 'unplugin';
import compilationPlugin from './unPlugins/compilation.js';
import type { WebpackConfig } from './index.js';

type Compiler = 'webpack' | 'esbuild';

const SKIP_COMPILE = [
  // polyfill and helpers
  'core-js', 'core-js-pure', '@swc/helpers', '@babel/runtime',
  // built-in runtime
  'react', 'react-dom', 'react-router', 'react-router-dom',
  // dev dependencies
  '@pmmmwh/react-refresh-webpack-plugin', 'webpack', 'webpack-dev-server', 'react-refresh',
];

function getCompilerPlugins(config: Config, compiler: 'webpack'): WebpackConfig['plugins'];
function getCompilerPlugins(config: Config, compiler: 'esbuild'): BuildOptions['plugins'];
function getCompilerPlugins(config: Config, compiler: Compiler) {
  const { sourceMap, transformPlugins = [], transforms = [], mode, compileIncludes, swcOptions, fastRefresh } = config;
  const compilerPlugins = [];
  const compileExcludes = [
    new RegExp(SKIP_COMPILE.map((dep) => `node_modules/?.+${dep}/`).join('|')),
    /bundles\/compiled/,
  ];
  if (swcOptions) {
    compilerPlugins.push(compilationPlugin({
      sourceMap,
      fastRefresh,
      mode,
      compileIncludes,
      compileExcludes,
      swcOptions,
    }));
  }

  compilerPlugins.push(
    ...transformPlugins,
    ...transforms.map((transform, index) => ({ name: `transform_${index}`, transform })),
  );

  return compiler === 'webpack'
    ? compilerPlugins.map(plugin => createUnplugin(() => plugin).webpack())
    : compilerPlugins.map(plugin => createUnplugin(() => plugin).esbuild());
}

export default getCompilerPlugins;
