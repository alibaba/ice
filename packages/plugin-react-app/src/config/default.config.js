module.exports = {
  alias: {},
  define: {},
  devPublicPath: '/',
  filename: '[name].js',
  // resolve.extensions
  extensions: ['.js', '.jsx', '.json', '.html', '.ts', '.tsx'],
  // resolve.modules
  modules: ['node_modules'],
  devServer: {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    hot: true,
    publicPath: '/',
    quiet: true,
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
  entry: 'src/index.jsx',
  externals: {},
  hash: false,
  injectBabel: 'polyfill',
  minify: true,
  outputAssetsPath: {
    js: 'js',
    css: 'css',
  },
  outputDir: 'build',
  proxy: {},
  publicPath: '/',
  targets: 'last 2 versions, Firefox ESR, > 1%, ie >= 9, iOS >= 8, Android >= 4',
  vendor: true,
  libraryTarget: '',
  library: '',
  libraryExport: '',
  ignoreHtmlTemplate: false,
  sourcemap: false,
  terserOptions: {},
  cssLoaderOptions: {},
  lessLoaderOptions: {},
  sassLoaderOptions: {},
  postcssrc: false,
  compileDependencies: [],
  babelPlugins: [],
  babelPresets: [],
  eslintLoaderOptions: {
    disable: false
  }
};
