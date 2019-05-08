const webpack = require('webpack');

module.exports = (api, value) => {
  api.chainWebpack((config) => {
    if (config.plugins.get('define-plugin')) {
      config
        .plugin('define-plugin')
        .tap((args) => [Object.assign(...args, value)]);
    } else {
      config
        .plugin('define-plugin')
        .use(webpack.DefinePlugin, [value]);
    }
  });
};
