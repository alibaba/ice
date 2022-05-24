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
  const { sourceMap, transformPlugins = [], transforms = [], mode, compileIncludes } = config;
  const compilerPlugins = [];
  if (compiler === 'webpack') {
    // create regexp for ignore dependencies
    const compileExcludes = [
      new RegExp(SKIP_COMPILE.map((dep) => `node_modules/?.+${dep}/`).join('|')),
      /bundles\/compiled/,
    ];
    // compilationPlugin only works for webpack, esbuild has it's own compilation
    compilerPlugins.push(compilationPlugin({ sourceMap, mode, compileIncludes, compileExcludes }));
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
