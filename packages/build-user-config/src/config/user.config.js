const { validation } = require('@builder/app-helpers');

module.exports = [
  {
    name: 'alias',
    validation: 'object',
    defaultValue: {}
  },
  {
    name: 'define',
    validation: 'object',
    defaultValue: {}
  },
  {
    name: 'devPublicPath',
    validation: 'string',
    defaultValue: '/'
  },
  {
    name: 'filename',
    validation: 'string',
    defaultValue: '[name].js'
  },
  {
    name: 'extensions',
    validation: 'array',
    defaultValue: [
      '.js',   '.jsx',
      '.json', '.html',
      '.ts',   '.tsx',
      '.rml'
    ]
  },
  {
    name: 'modules',
    validation: 'array',
    defaultValue: [ 'node_modules' ]
  },
  {
    name: 'devServer',
    validation: 'object',
    defaultValue: {
      disableHostCheck: true,
      compress: true,
      transportMode: 'ws',
      logLevel: 'silent',
      clientLogLevel: 'none',
      hot: true,
      publicPath: '/',
      quiet: false,
      watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 600,
      },
      before(app) {
        app.use((req, res, next) => {
          // set cros for all served files
          res.set('Access-Control-Allow-Origin', '*');
          next();
        });
      },
    }
  },
  {
    name: 'mock',
    validation: (val) => {
      return validation('sourceMap', val, 'object|boolean');
    },
    defaultValue: {
      exclude: ['**/excludeMock/**'],
    },
  },
  {
    name: 'externals',
    validation: 'object',
    defaultValue: {}
  },
  {
    name: 'hash',
    validation: (val) => {
      return validation('hash', val, 'string|boolean');
    },
    defaultValue: false
  },
  {
    name: 'minify',
    validation: 'boolean'
  },
  {
    name: 'outputAssetsPath',
    validation: 'object',
    defaultValue: { js: 'js', css: 'css' }
  },
  {
    name: 'outputDir',
    validation: 'string',
    defaultValue: 'build'
  },
  {
    name: 'proxy',
    validation: 'object',
    defaultValue: {}
  },
  {
    name: 'publicPath',
    validation: 'string',
    defaultValue: '/'
  },
  {
    name: 'browserslist',
    validation: (val) => {
      return validation('browserslist', val, 'string|object');
    },
    defaultValue: 'last 2 versions, Firefox ESR, > 1%, ie >= 9, iOS >= 8, Android >= 4'
  },
  {
    name: 'vendor',
    validation: 'boolean',
    defaultValue: true
  },
  {
    name: 'libraryTarget',
    validation: 'string',
    defaultValue: ''
  },
  {
    name: 'library',
    validation: (val) => {
      return validation('library', val, 'string|object');
    },
    defaultValue: ''
  },
  {
    name: 'libraryExport',
    validation: (val) => {
      return validation('library', val, 'string|array');
    },
    defaultValue: ''
  },
  {
    name: 'sourceMap',
    validation: (val) => {
      return validation('sourceMap', val, 'string|boolean');
    },
  },
  {
    name: 'terserOptions',
    validation: 'object',
    defaultValue: {}
  },
  {
    name: 'cssLoaderOptions',
    validation: 'object',
    defaultValue: {}
  },
  {
    name: 'lessLoaderOptions',
    validation: 'object',
    defaultValue: {}
  },
  {
    name: 'sassLoaderOptions',
    validation: 'object',
    defaultValue: {}
  },
  {
    name: 'postcssrc',
    validation: 'boolean',
    defaultValue: false
  },
  {
    name: 'compileDependencies',
    validation: 'array',
    defaultValue: []
  },
  {
    name: 'babelPlugins',
    validation: 'array',
    defaultValue: []
  },
  {
    name: 'babelPresets',
    validation: 'array',
    defaultValue: []
  },
  {
    name: 'eslint',
    validation: (val) => {
      return validation('eslint', val, 'boolean|object');
    }
  },
  {
    name: 'tsChecker',
    validation: 'boolean',
    defaultValue: false
  },
  {
    name: 'dll',
    validation: 'boolean',
    defaultValue: false
  },
  {
    name: 'dllEntry',
    validation: 'object',
    defaultValue: {}
  },
  {
    name: 'polyfill',
    validation: (val) => {
      return validation('polyfill', val, 'string|boolean|object');
    },
    defaultValue: 'entry'
  },
  {
    name: 'targets',
    validation: 'array',
  },
  {
    name: 'webpackLoaders',
    validation: 'object',
  },
  {
    name: 'webpackPlugins',
    validation: 'object',
  },
  {
    name: 'postcssOptions',
    validation: 'object',
  },
  {
    name: 'modularImportRuntime',
    validation: 'boolean',
    defaultValue: true,
  },
  {
    name: 'esbuild',
    validation: 'object'
  },
  {
    name: 'experiments',
    validation: 'object',
    defaultValue: {},
  }
];
