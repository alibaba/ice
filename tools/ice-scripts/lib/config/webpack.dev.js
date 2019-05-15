/* eslint-disable indent */
const webpack = require('webpack');
const getBaseCofing = require('./webpack.base.js');

module.exports = () => {
  const baseConfig = getBaseCofing('development');

  // set source map
  baseConfig.devtool('cheap-module-source-map');

  baseConfig.devServer
    .disableHostCheck(false)
    .compress(true)
    .clientLogLevel('none')
    .hot(true)
    .publicPath('/')
    .quiet(true)
    .watchOptions({
      ignored: /node_modules/,
      aggregateTimeout: 600,
    })
    .before((app) => {
      // TODO: add user's before
      // user.before(app);
      app.use((req, res, next) => {
        // set cros for all served files
        res.set('Access-Control-Allow-Origin', '*');
        next();
      });
    });

  // set hot reload plugin
  baseConfig
    .plugin('HotModuleReplacementPlugin')
      .use(webpack.HotModuleReplacementPlugin);

  return baseConfig;
};
