import type { Config } from '@ice/types';
import type { UnpluginOptions } from 'unplugin';
import compilationPlugin from './compilation.js';

const SKIP_COMPILE = [
  // polyfill and helpers
  'core-js', 'core-js-pure', '@swc/helpers', '@babel/runtime',
  // built-in runtime
  'react', 'react-dom', 'react-router', 'react-router-dom',
  // dev dependencies
  '@pmmmwh/react-refresh-webpack-plugin', 'webpack', 'webpack-dev-server', 'react-refresh',
];

const getTransformPlugins = (config: Config): UnpluginOptions[] => {
  const { sourceMap, transformPlugins = [], transforms = [], mode, compileIncludes } = config;
  // create regexp for ignore dependencies
  const compileExcludes = [
    new RegExp(SKIP_COMPILE.map((dep) => `node_modules/?.+${dep}/`).join('|')),
    /bundles\/compiled/,
  ];

  return [
    compilationPlugin({ sourceMap, mode, compileIncludes, compileExcludes }),
    ...transformPlugins,
    ...transforms.map((transform, index) => ({ name: `transform_${index}`, transform })),
  ];
};

export default getTransformPlugins;
