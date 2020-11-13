/* eslint global-require: 0 */
module.exports = [
  {
    name: 'devServer',
    defaultValue: {
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
      // For mutilple task, web will occupy the server root route
      writeToDisk: true,
      historyApiFallback: true,
    }
  },
  {
    name: 'outputAssetsPath',
    defaultValue: {
      js: '',
      css: '',
    }
  },
  {
    name: 'inlineStyle',
    defaultValue: false,
    configWebpack: require('./userConfig/inlineStyle'),
    validation: 'boolean'
  },
  {
    name: 'polyfill',
    defaultValue: false
  },
  {
    name: 'compileDependencies',
    defaultValue: ['']
  }
];
