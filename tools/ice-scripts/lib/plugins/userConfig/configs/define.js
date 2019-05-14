const webpack = require('webpack');

module.exports = (api, value) => {
  api.chainWebpack((config) => {
    if (config.plugins.get('DefinePlugin')) {
      config
        .plugin('DefinePlugin')
        .tap((args) => [Object.assign(...args, value)]);
    } else {
      config
        .plugin('DefinePlugin')
        .use(webpack.DefinePlugin, [value]);
    }
  });
};
