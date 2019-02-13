const debug = require('debug')('ice:start:block');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const getBlockType = require('../../utils/block-type');
const getBaseConfig = require('../../config/webpack.block');
const getVueConfig = require('../../config/webpack.vue.block');
const PORT = 5000;

module.exports = function blockDevStart(cwd, opt) {
  const blockType = getBlockType(cwd);

  let config;

  if (blockType === 'vue') {
    config = getVueConfig(cwd, blockType);
  } else {
    config = getBaseConfig(cwd, blockType);
  }

  // devServer
  let { port = PORT } = opt;
  port = parseInt(port, 10);
  debug('port: %s', port);

  config.devServer
    .compress(false)
    .host('localhost')
    .disableHostCheck(true)
    .stats({
      colors: true,
      chunks: false,
      children: false,
      entrypoints: false,
      chunkModules: false,
      source: false,
      cachedAssets: false,
      cached: false,
      chunkOrigins: false,
      modules: false,
      builtAt: false,
    })
    .hot(true);

  const options = config.toConfig();

  WebpackDevServer.addDevServerEntrypoints(options, options.devServer);
  const compiler = webpack(options);
  const server = new WebpackDevServer(compiler, options.devServer);
  server.listen(port, '127.0.0.1', () => {
    console.log(' ');
    console.log(chalk.green(`Starting at http://127.0.0.1:${port}`));
  });
};
