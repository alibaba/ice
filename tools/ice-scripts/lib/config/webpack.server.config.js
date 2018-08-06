module.exports = (paths, options = {}) => {
  return {
    // historyApiFallback: true,
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
      // todo add user's before
      // user.before(app);
      app.use((req, res, next) => {
        // set cros for all served files
        res.set('Access-Control-Allow-Origin', '*');
        next();
      });
    },
  };
};
