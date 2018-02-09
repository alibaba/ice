const DEV_DIST_DIR = '/build/';

module.exports = (paths, options = {}) => {
  const devType = options.devType;
  return {
    disableHostCheck: true,
    compress: true,
    clientLogLevel: 'none',
    contentBase: paths.appDirectory,
    // contentBase: paths.appPublic,
    hot: true,
    publicPath: paths.devDistDir || DEV_DIST_DIR,
    quiet: true,
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 600,
    },
    proxy: {
      '/**': {
        // target: '/index.html', // default target
        bypass: function(req, res, opt) {
          // your custom code to check for any exceptions
          // console.log('bypass check', {req: req, res:res, opt: opt});
          if (devType === 'block') {
          } else if (devType === 'component') {
          } else {
            // default devType === 'project'
            if (req.path === '/') {
              return '/build/';
            }
          }

          return req.path;
        },
      },
    },
  };
};
