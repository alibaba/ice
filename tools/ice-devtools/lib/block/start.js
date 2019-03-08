const debug = require('debug')('ice:start:block');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const chalk = require('chalk');
const getBlockType = require('../../utils/block-type');
const getBaseConfig = require('../../config/webpack.block');
const logger = require('../../utils/logger');
const PORT = 5000;

module.exports = function blockDevStart(cwd, opt) {
  const blockType = getBlockType(cwd);

  let config;

  if (blockType === 'react') {
    config = getBaseConfig(cwd, blockType);
  } else {
    logger.fatal(`${blockType} is not support by defalut, use 'npm start' instead`);
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
    console.log(chalk.yellow(`Starting at http://127.0.0.1:${port}`));
    console.log(' ');
  });
};
