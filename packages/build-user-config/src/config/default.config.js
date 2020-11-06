module.exports = {
  alias: {},
  define: {},
  devPublicPath: '/',
  filename: '[name].js',
  // resolve.extensions
  extensions: ['.js', '.jsx', '.json', '.html', '.ts', '.tsx', '.rml'],
  // resolve.modules
  modules: ['node_modules'],
  devServer: {
    disableHostCheck: true,
    compress: true,
    // Use 'ws' instead of 'sockjs-node' on server since webpackHotDevClient is using native websocket
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
  },
  mock: true,
  externals: {},
  hash: false,
  minify: true,
  outputAssetsPath: {
    js: 'js',
    css: 'css',
  },
  outputDir: 'build',
  proxy: {},
  publicPath: '/',
  browserslist: 'last 2 versions, Firefox ESR, > 1%, ie >= 9, iOS >= 8, Android >= 4',
  vendor: true,
  libraryTarget: '',
  library: '',
  libraryExport: '',
  sourceMap: false,
  terserOptions: {},
  cssLoaderOptions: {},
  lessLoaderOptions: {},
  sassLoaderOptions: {},
  postcssrc: false,
  compileDependencies: [],
  babelPlugins: [],
  babelPresets: [],
  eslint: false,
  tsChecker: false,
  dll: false,
  dllEntry: {},
  polyfill: 'entry'
};
