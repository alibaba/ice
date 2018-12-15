const debug = require('debug')('ice:webpack:block');
const path = require('path');
const fs = require('fs');
const hbs = require('handlebars');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getWebpackBaseConfig = require('./webpack.base');
const hbsPath = path.join(__dirname, '../template/preview/block.html.hbs');

module.exports = function getWebpacksConfig(cwd) {
  const config = getWebpackBaseConfig();

  // 增加入口文件  index.js
  const entry = path.join(cwd, 'src/index.js');
  const jsTemplatePath = path.join(__dirname, '../template/preview/block-react-index.js.hbs');
  const jsPath = path.join(__dirname, '../.temp/', `block-react-index.js`);
  debug('%j', {entry, jsPath});
  const jsTemplateContent = fs.readFileSync(jsTemplatePath, 'utf-8');
  const template = hbs.compile(jsTemplateContent);

  fs.writeFileSync(jsPath, template({entry}));

  config.entry('index').add(jsPath)
  config.context(cwd);
  config.output
    .path(path.join(cwd, 'build'))
    .filename('[name].js')
    .publicPath('./');

  config
    .plugin('html')
    .use(HtmlWebpackPlugin, [{
      template: hbsPath,
    }]);
  return config;
}
