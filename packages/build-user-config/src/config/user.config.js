const { validation } = require('@builder/app-helpers');

const watchIgnoredRegexp = process.env.RUNTIME_DEBUG ? /node_modules/ : /node_modules|[/\\]\.ice[/\\]|[/\\]\.rax[/\\]/;
const sockHost = process.env.WDS_SOCKET_HOST;
const sockPath = process.env.WDS_SOCKET_PATH; // default: '/ws'
const sockPort = process.env.WDS_SOCKET_PORT;

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
    name: 'watchOptions',
    validation: 'object',
    defaultValue: {
      ignored: watchIgnoredRegexp,
    }
  },
  {
    name: 'devServer',
    validation: 'object',
    defaultValue: {
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      },
      compress: true,
      webSocketServer: 'ws',
      devMiddleware: {
        publicPath: '/',
      },
      static: {
        watch: {
          ignored: watchIgnoredRegexp,
        }
      },
      client: {
        overlay: {
          errors: true,
          warnings: false, // overlay only shows error
        },
        logging: 'info', 
        webSocketURL: {
          // Enable custom sockjs pathname for websocket connection to hot reloading server.
          // Enable custom sockjs hostname, pathname and port for websocket connection
          // to hot reloading server.
          hostname: sockHost,
          pathname: sockPath,
          port: sockPort,
        },
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
    validation: 'boolean|string|object',
    defaultValue: 'terser',
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
    validation: 'array|string|object',
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
    },
    defaultValue: false,
  },
  {
    name: 'tsChecker',
    validation: 'boolean',
    defaultValue: false
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
    name: 'swc',
    defaultValue: false,
    validation: 'boolean|object',
  },
  {
    name: 'experiments',
    validation: 'object',
    defaultValue: {},
  }
];
