export const SKIP_COMPILE = [
  // polyfill and helpers
  'core-js', 'core-js-pure', '@swc/helpers', '@babel/runtime', 'tslib',
  // Deprecate version of @babel/runtime.
  'babel-runtime',
  // built-in runtime
  'react', 'react-dom',
  // dev dependencies
  '@pmmmwh/react-refresh-webpack-plugin', 'webpack', 'webpack-dev-server', 'react-refresh',
];

const compileExcludes = [
  new RegExp(SKIP_COMPILE.map((dep) => `node_modules/[\\w-@\\.]*${dep}/`).join('|')),
  /@ice\/bundles\/compiled/,
];

export default compileExcludes;
