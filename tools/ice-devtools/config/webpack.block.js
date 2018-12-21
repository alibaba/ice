const debug = require('debug')('ice:webpack:block');
const path = require('path');
const fs = require('fs');
const hbs = require('handlebars');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getWebpackBaseConfig = require('./webpack.base');

console.log('process.platform:', process.platform);

const hbsPath = path.join(__dirname, '../template/preview/block.html.hbs');

module.exports = function getWebpacksConfig(cwd) {
  const config = getWebpackBaseConfig();

  // 增加入口文件  index.js
  const entry = path.join(cwd, 'src/index.js');
  const hbsTemplatePath = path.join(
    __dirname,
    '../template/preview/block-react-index.js.hbs'
  );
  const jsPath = path.join(__dirname, '../.temp/', 'block-react-index.js');
  debug('%j', { entry, jsPath });
  const hbsTemplateContent = fs.readFileSync(hbsTemplatePath, 'utf-8');
  const compileTemplateContent = hbs.compile(hbsTemplateContent);
  const isWin = process.platform === 'win32';
  const realEntry = isWin ? entry.replace(/\\/g, '\\\\') : entry;
  const jsTemplateContent = compileTemplateContent({ entry: realEntry });

  fs.writeFileSync(jsPath, jsTemplateContent);

  config.entry('index').add(jsPath);
  config.context(cwd);
  config.output
    .path(path.join(cwd, 'build'))
    .filename('[name].js')
    .publicPath('./');

  config.plugin('html').use(HtmlWebpackPlugin, [
    {
      template: hbsPath,
    },
  ]);
  return config;
};
