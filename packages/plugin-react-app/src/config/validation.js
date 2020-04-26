const assert = require('assert');
const { isPlainObject } = require('lodash');

const validation = (key, value, types) => {
  const validateResult = types.split('|').some((type) => {
    if (type === 'array') {
      return Array.isArray(value);
    } else if (type === 'object') {
      return isPlainObject(value);
    } else {
      // eslint-disable-next-line valid-typeof
      return typeof value === type;
    }
  });
  assert(validateResult, `Config ${key} should be ${types.replace('|', ' | ')}, but got ${value}`);
  return validateResult;
};

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
  targets: (val) => {
    return validation('targets', val, 'string|object');
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
  sourcemap: 'boolean',
  terserOptions: 'object',
  cssLoaderOptions:'object',
  lessLoaderOptions: 'object',
  sassLoaderOptions: 'object',
  postcssrc: 'boolean',
  compileDependencies: 'array',
  babelPlugins: 'array',
  babelPresets: 'array',
  eslintLoaderOptions: 'object'
};
