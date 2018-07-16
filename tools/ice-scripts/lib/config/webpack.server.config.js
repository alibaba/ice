const DEV_DIST_DIR = '/build/';

module.exports = (paths, options = {}) => {
  const devType = options.devType;
  return {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appDirectory,
    // contentBase: paths.appPublic,
    hot: process.env.HOT_RELOAD !== 'false',
    publicPath: paths.devDistDir || DEV_DIST_DIR,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 600,
    },
    before(app) {
      // todo add user's before
      // user.before(app);
      app.use((req, res, next) => {
        // your custom code to check for any exceptions
        if (devType === 'project') {
          if (['/', '/index.html'].includes(req.url)) {
            req.url = DEV_DIST_DIR;
          }
        }
        next();
      });
    },
  };
};
