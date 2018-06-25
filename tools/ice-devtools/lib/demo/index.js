/* eslint prefer-arrow-callback: 0 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const glob = require('glob');

const getWebpackConfig = require('./webpack.config');

module.exports = function (opts) {
  const pkgPath = path.resolve(opts.cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error('package.json not exists.');
  }

  const entry = {};
  glob.sync('demo/*.jsx', { cwd: opts.cwd }).forEach((item) => {
    const file = item.replace('.jsx', '');
    entry[file] = path.resolve(item);
  });

  Object.keys(entry).forEach((i) => {
    console.log('build:', i);
  })

  const compiler = webpack(getWebpackConfig(entry));
  compiler.run((error) => { error && console.log(error) });
};
