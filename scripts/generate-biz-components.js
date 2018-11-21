const path = require('path');
const docsGen = require('component-docs-generator');

const cwd = process.cwd();
const sourceDir = path.join(cwd, 'react-materials', 'components');
const buildDir = path.join(cwd, 'build');
const outputFilename = 'outside-biz-component.json';

docsGen(sourceDir, buildDir, outputFilename)
  .then(() => {
    console.log(`数据源生成成功: ${outputFilename}`);
  })
  .catch(() => {
    console.log('数据源生成失败');
  });
