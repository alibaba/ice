const VUE_STYLE_LOADER = require.resolve('vue-style-loader');
const VUE_LOADER = require.resolve('vue-loader');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const getBaseConfig = require('./webpack.block');

module.exports = function getWebpacksConfig(cwd, type) {
  const config = getBaseConfig(cwd, type);

  config
    .externals({
      vue: 'Vue',
    });

  config.resolve.extensions
    .add('.vue');

  config.module
    .rule('scss')
    .use('vue-style-loader')
    .loader(VUE_STYLE_LOADER)
    .end();

  config.module
    .rule('vue')
    .test(/\.vue$/)
    .use('vue-loader')
    .loader(VUE_LOADER);

  config.plugin('vue').use(VueLoaderPlugin);

  return config;
};
