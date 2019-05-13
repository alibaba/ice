/* eslint-disable indent */
const webpack = require('webpack');
const getBaseCofing = require('./webpack.base.js');
const processEntry = require('./processEntry');

module.exports = () => {
  const baseConfig = getBaseCofing('development');
  const defaultEntry = baseConfig.entry('index').values()[0];

  const entry = processEntry(defaultEntry,
    {
      polyfill: true,
      hotDev: true,
    }
  );

  // set source map
  baseConfig.devtool('cheap-module-source-map');

  // set development mode entries
  // ice-scripts will add hot-reload entry and polyfill entry
  baseConfig.entryPoints.clear();
  baseConfig.merge({ entry });

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
