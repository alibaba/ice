const { resolve } = require('path');
const getWebpackBaseConfig = require('./webpack.base');
const { getPkgJSON } = require('../utils/pkg-json');

console.log('process.platform:', process.platform);

const DEMO_LOADER = require.resolve('../utils/demo-loader');

module.exports = function getWebpacksConfig(cwd) {
  const config = getWebpackBaseConfig(cwd);

  config.module
    .rule(/\.md$/i)
    .test(/\.md$/i)
    .use('demo-loader')
    .loader(DEMO_LOADER);

  const pkg = getPkgJSON(cwd);

  config.resolve.alias.set(pkg.name, resolve(cwd, 'src/index.js'));

  return config;
};
