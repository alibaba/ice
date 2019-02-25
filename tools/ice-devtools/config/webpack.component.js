const { resolve, join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs');
const hbs = require('handlebars');

const getWebpackBaseConfig = require('./webpack.base');

const getDemos = require('../utils/get-demos');
const { getPkgJSON } = require('../utils/pkg-json');
const getTempPath = require('../utils/temp-path');
const formatPathForWin = require('../utils/format-path-for-win');
const { parseMarkdownParts } = require('../utils/markdown-helper');

console.log('process.platform:', process.platform);

const DEMO_LOADER = require.resolve('../utils/demo-loader');

module.exports = function getWebpacksConfig(cwd) {
  const config = getWebpackBaseConfig(cwd);

  const demos = getDemos(cwd);

  demos.map((demo) => {
    const demoName = demo.filename;
    const demoFile = join(cwd, 'demo', demoName + '.md');
    config.entry(`__Component_Dev__.${demoName}`).add(demoFile);
  });

  const entry = generateEntryTemplate(demos);
  config.entry('index').add(entry);

  const filePath = join(cwd, 'README.md');
  const markdown = fs.readFileSync(filePath, 'utf-8');
  const { content: readme } = parseMarkdownParts(markdown);
  config.plugin('html').use(HtmlWebpackPlugin, [
    {
      template: join(__dirname, `../template/component/index.html.hbs`),
      filename: 'index.html',
      readme,
      demos
    }
  ]);

  config.module
    .rule(/\.md$/i)
    .test(/\.md$/i)
    .use('demo-loader')
    .loader(DEMO_LOADER);

  const pkg = getPkgJSON(cwd);

  config.resolve.alias.set(pkg.name, resolve(cwd, 'src/index.js'));

  return config;
};

function generateEntryTemplate(demos) {
  const hbsTemplatePath = join(__dirname, `../template/component/index.js.hbs`);

  const hbsTemplateContent = fs.readFileSync(hbsTemplatePath, 'utf-8');
  const compileTemplateContent = hbs.compile(hbsTemplateContent);

  const tempPath = getTempPath();
  const jsPath = join(tempPath, `component-index.js`);

  const jsTemplateContent = compileTemplateContent({ 
    demos: demos.map((demo) => {
      return {
        path: formatPathForWin(demo.filePath)
      };
    })
  });

  fs.writeFileSync(jsPath, jsTemplateContent);

  return jsPath;
}
