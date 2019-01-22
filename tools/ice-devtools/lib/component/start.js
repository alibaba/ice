const debug = require('debug')('ice:start:block');
const chalk = require('chalk');

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const getBaseConfig = require('../../config/webpack.component');
const router = require('../../utils/demo-router');

const PORT = 5000;

module.exports = function blockDevStart(cwd, opt) {
  const config = getBaseConfig(cwd);

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
    .contentBase(false)
    .hot(true);

  const options = config.toConfig();

  // webpack-chain 中没有 after 这个方法，只能这样赋值
  Object.assign(options.devServer, {
    after: (app, server) => {
      router(app, cwd);
    }
  });

  WebpackDevServer.addDevServerEntrypoints(options, options.devServer);
  const compiler = webpack(options);
  const server = new WebpackDevServer(compiler, options.devServer);
  server.listen(port, '0.0.0.0', () => {
    console.log(' ');
    console.log(chalk.green(`Starting at http://127.0.0.1:${port}`));
  });
};
