/* eslint prefer-arrow-callback: 0 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const glob = require('glob');
const ora = require('ora');
const handerbars = require('handlebars');

const getWebpackConfig = require('./config/getWebpackConfig');

function getconfig(cwd) {
  const pkgPath = path.resolve(cwd, 'package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error('package.json not exists.');
  }

  const entry = {};
  const jsxfiles = glob.sync('build/*.jsx', { cwd });
  if (!jsxfiles.length) {
    const templateJsPath = path.join(__dirname, './template/block-demo.indexjsx.hbs');
    const templateContent = fs.readFileSync(templateJsPath, 'utf-8');
    const jsString = handerbars.compile(templateContent)({});
    const buildPath =  path.join(cwd, './build');
    if (!fs.existsSync(buildPath)) {
      fs.mkdirSync(buildPath);
    }
    const buildIndexJsxPath =  path.join(buildPath, 'index.jsx');
    fs.writeFileSync(buildIndexJsxPath, jsString);
    jsxfiles.push('build/index.jsx');
  }

  const buildIndexHTMLPath =  path.join(cwd, './build/index.html');
  if (!fs.existsSync(buildIndexHTMLPath)) {
    const templateHTMLPath = path.join(__dirname, './template/block-demo.hbs');
    const templateContent = fs.readFileSync(templateHTMLPath, 'utf-8');
    const htmlString = handerbars.compile(templateContent)({
      isReact: true,
      isBlock: true,
      blockJS: './index.js',
    });
    const buildIndexHTMLPath =  path.join(cwd, './build/index.html');
    fs.writeFileSync(buildIndexHTMLPath, htmlString);
  }


  jsxfiles.forEach((item) => {
    const file = item.replace('.jsx', '');
    entry[file] = path.join(cwd, item);
  });

  const config = getWebpackConfig();
  const outPath = path.join(cwd, process.env.BUILD_DEST || './');
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
