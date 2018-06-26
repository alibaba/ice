/* eslint prefer-arrow-callback: 0 */
const path = require('path');
const fs = require('fs');
const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

const getconfig = require('../builddemo/getconfig');

module.exports = function (opts) {
  const pkgPath = path.resolve(opts.cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error('package.json not exists.');
  }

  const config = getconfig(opts.cwd);

  const compiler = webpack(config);

  const server = new WebpackDevServer(compiler, {
    disableHostCheck: true,
    hot: true,
    quiet: true
  });

  console.log('Project is running at http://127.0.0.1:8089/demo/')

  server.listen(8089);

};
