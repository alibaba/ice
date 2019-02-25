const debug = require('debug')('ice:webpack:block');
const path = require('path');
const fs = require('fs');
const hbs = require('handlebars');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getWebpackBaseConfig = require('./webpack.base');
const getTempPath = require('../utils/temp-path');

console.log('process.platform:', process.platform);

module.exports = function getWebpacksConfig(cwd, type = 'react') {
  const config = getWebpackBaseConfig(cwd);

  // 增加入口文件  index.js
  const entry = path.join(cwd, 'src/index.js');
  const blockNodeModulesPath = path.join(cwd, '/node_modules/')

  const hbsTemplatePath = path.join(
    __dirname,
    `../template/preview/block-${type}-index.js.hbs`
  );

  const tempPath = getTempPath();
  const jsPath = path.join(tempPath, `block-${type}-index.js`);
  debug('%j', { entry, jsPath });
  const hbsTemplateContent = fs.readFileSync(hbsTemplatePath, 'utf-8');
  const compileTemplateContent = hbs.compile(hbsTemplateContent);

  const jsTemplateContent = compileTemplateContent({ 
    entry: formatPath(entry),
    blockNodeModulesPath: formatPath(blockNodeModulesPath)
  });

  fs.writeFileSync(jsPath, jsTemplateContent);

  config.entry('index').add(jsPath);
  config.context(cwd);
  config.output
    .path(path.join(cwd, 'build'))
    .filename('[name].js')
    .publicPath('./');

  config.plugin('html').use(HtmlWebpackPlugin, [
    {
      template: path.join(__dirname, `../template/preview/block.${type}.html.hbs`),
    },
  ]);
  return config;
};

function formatPath(p) {
  const isWin = process.platform === 'win32';
  return isWin ? p.replace(/\\/g, '\\\\') : p;
}