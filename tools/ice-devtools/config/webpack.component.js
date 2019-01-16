const { resolve, join } = require('path');

const getWebpackBaseConfig = require('./webpack.base');

const getDemos = require('../utils/get-demos');
const { getPkgJSON } = require('../utils/pkg-json');

console.log('process.platform:', process.platform);

const DEMO_LOADER = require.resolve('../utils/demo-loader');

module.exports = function getWebpacksConfig(cwd) {
  const config = getWebpackBaseConfig(cwd);

  const demos = getDemos(cwd);

  demos.map((demo) => {
    const demoName = demo.filename;
    const demoFile = join(cwd, 'demo', demoName + '.md');
    config.entry(`__Component_Dev__.${demoName}`).add(demoFile);
  });

  config.module
    .rule(/\.md$/i)
    .test(/\.md$/i)
    .use('demo-loader')
    .loader(DEMO_LOADER);

  const pkg = getPkgJSON(cwd);

  config.resolve.alias.set(pkg.name, resolve(cwd, 'src/index.js'));

  return config;
};
