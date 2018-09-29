/* eslint prefer-arrow-callback: 0 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const glob = require('glob');
const ora = require('ora');

const getWebpackConfig = require('./config/getWebpackConfig');

function getconfig(cwd) {
  const pkgPath = path.resolve(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error('package.json not exists.');
  }

  const entry = {};
  const jsxfiles = glob.sync('build/*.jsx', { cwd });
  if (!jsxfiles.length) {
    throw new Error('demo 目录下面没有 .jsx 文件');
  }

  jsxfiles.forEach((item) => {
    const file = item.replace('.jsx', '');
    entry[file] = path.join(cwd, item);
    console.log('demo:', file);
  });

  const config = getWebpackConfig();
  const outPath = path.join(cwd, process.env.BUILD_DEST || './');
  console.log(outPath);
  config.entry = entry;
  config.output = {
    path: outPath,
    publicPath: './',
    filename: '[name].js',
  };

  config.mode = 'production';

  return config;
};

module.exports = function(opts) {
  const pkgPath = path.resolve(opts.cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error('package.json not exists.');
  }
  console.log(opts.cwd)
  const config = getconfig(opts.cwd);
  const spinner = ora('Building ...').start();
  webpack(config).run((error) => {
    if (error) {
      spinner.fail('build fail');
      console.log(error);
    } else {
      spinner.succeed('build success');
      opts.cb && opts.cb();
    }
  });
};
