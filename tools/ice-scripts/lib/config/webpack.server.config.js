const cliInstance = require('../utils/cliInstance');
const pkgData = require('./packageJson');
const demoRouter = require('../component/demoRouter');

module.exports = () => {
  const options = {
    // historyApiFallback: true,
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    hot: !cliInstance.get('disabledReload'),
    publicPath: '/',
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 600,
    },
    before(app) {
      // todo add user's before
      // user.before(app);
      app.use((req, res, next) => {
        // set cros for all served files
        res.set('Access-Control-Allow-Origin', '*');
        next();
      });
    },
  };

  if (pkgData.type === 'component') {
    options.after = demoRouter;
    options.contentBase = false;
  }

  return options;
};
