const webpack = require('webpack');

module.exports = ({ chainWebpack }, value) => {
  chainWebpack((config) => {
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
