const { validation } = require('build-app-helpers');

module.exports = {
  alias: 'object',
  define: 'object',
  devPublicPath: 'string',
  filename: 'string',
  extensions: 'array',
  modules: 'array',
  devServer: 'object',
  entry: (val) => {
    // entry: string | array
    // entry : { [name]: string | array }
    return validation('entry', val, 'string|array|object');
  },
  externals: 'object',
  hash: (val) => {
    return validation('hash', val, 'string|boolean');
  },
  injectBabel: (val) => {
    return validation('injectBabel', val, 'string|boolean');
  },
  minify: 'boolean',
  mock: 'boolean',
  outputAssetsPath: 'object',
  outputDir: 'string',
  proxy: 'object',
  publicPath: 'string',
  targets: 'array',
  browserslist: (val) => {
    return validation('browserslist', val, 'string|object');
  },
  vendor: 'boolean',
  library: (val) => {
    return validation('library', val, 'string|object');
  },
  libraryTarget: 'string',
  libraryExport: (val) => {
    return validation('library', val, 'string|array');
  },
  ignoreHtmlTemplate: 'boolean',
  sourceMap: 'boolean',
  terserOptions: 'object',
  cssLoaderOptions: 'object',
  lessLoaderOptions: 'object',
  sassLoaderOptions: 'object',
  postcssrc: 'boolean',
  compileDependencies: 'array',
  babelPlugins: 'array',
  babelPresets: 'array',
  eslint: (val) => {
    return validation('eslint', val, 'boolean|object');
  },
  tsChecker: 'boolean',
  dll: 'boolean',
  // dllEntry: { [string]: string[] }
  dllEntry: 'object',
  inlineStyle: 'boolean',
  polyfill: (val) => {
    return validation('polyfill', val, 'string|object');
  }
};
