const path = require('path');
const docsGen = require('component-docs-generator');

const cwd = process.cwd();
const sourceDir = path.join(cwd, 'react-materials', 'components');
const buildDir = path.join(cwd, 'build');

docsGen(sourceDir, buildDir)
  .then(() => {
    console.log('biz-components 数据源生成成功');
  })
  .catch(() => {
    console.log('biz-components 数据源生成失败');
  });
