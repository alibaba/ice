/* eslint prefer-arrow-callback: 0 */
const path = require('path');
const fs = require('fs');
const glob = require('glob');

const getWebpackConfig = require('../config/getWebpackConfig');

module.exports = function (cwd) {
  const pkgPath = path.resolve(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error('package.json not exists.');
  }

  const entry = {};
  const jsxfiles = glob.sync('demo/*.jsx', { cwd });
  if (!jsxfiles.length) {
    throw new Error('demo 目录下面没有 .jsx 文件');
  }

  jsxfiles.forEach((item) => {
    const file = item.replace('.jsx', '');
    entry[file] = path.resolve(item);
    console.log('demo:', file);
  });

  const config = getWebpackConfig();
  config.entry = entry;
  config.output = {
    path: path.resolve(process.env.BUILD_DEST || './'),
    publicPath: './',
    filename: '[name].js',
  }
  return config;
};
