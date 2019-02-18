const { resolve, join } = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const getWebpackBaseConfig = require('./webpack.base');

const getDemos = require('../utils/get-demos');
const { getPkgJSON } = require('../utils/pkg-json');
const { parseMarkdownParts } = require('../utils/markdown-helper');

console.log('process.platform:', process.platform);

const DEMO_LOADER = require.resolve('../utils/demo-loader');

module.exports = function getWebpacksConfig(cwd) {
  const config = getWebpackBaseConfig(cwd);

  const demos = getDemos(cwd);

  const pkg = getPkgJSON(cwd);
  const pkgName = pkg.name;

  demos.map((demo) => {
    const demoName = demo.filename;
    const demoFile = join(cwd, 'demo', demoName + '.md');
    config.entry(`${demoName}`).add(demoFile);
    
    const demoContent = fs.readFileSync(demoFile, 'utf-8');
    const { highlightedCode, content, meta } = parseMarkdownParts(demoContent);

    config.plugin(demoName + '-html').use(HtmlWebpackPlugin, [
      {
        template: join(__dirname, `../template/component/demo.hbs`),
        filename: `${demoName}.html`,
        demoName,
        name: pkgName, // 组件 npm 名
        meta: Object.keys(meta).map((key) => ({ key, value: meta[key] })),
        highlightedCode: highlightedCode,
        markdownContent: content,
        demos,
        chunks: [`${demoName}.js`]
      }
    ]);
  });

  config.plugin('demo-entry').use(HtmlWebpackPlugin, [
    {
      template: join(__dirname, `../template/component/home.hbs`),
      filename: 'index.html',
      name: pkgName,
      demos,
      chunks: []
    }
  ]);

  config.module
    .rule(/\.md$/i)
    .test(/\.md$/i)
    .use('demo-loader')
    .loader(DEMO_LOADER);

  config.resolve.alias.set(pkg.name, resolve(cwd, 'src/index.js'));

  return config;
};
