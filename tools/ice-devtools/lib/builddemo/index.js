/* eslint prefer-arrow-callback: 0 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const getconfig = require('./getconfig');

module.exports = function (opts) {
  const pkgPath = path.resolve(opts.cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error('package.json not exists.');
  }

  const config = getconfig(opts.cwd);

  webpack(config).run((error) => { error && console.log(error) });
};
