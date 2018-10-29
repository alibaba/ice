/**
 * 获取区块的生成路径，存放路径，相对于区块的路径
 */
const path = require('path');
const uppercamelcase = require('uppercamelcase');

module.exports = function getBlockPaths({ cwd, name, block, preview }) {
  const blockFolderName = block.alias || block.className || uppercamelcase(block.name); // block 目录名

  const pageFolderName = name;

  let outputPath = path.join('src', 'pages', pageFolderName, 'components');
  let componentPath = `./components/${blockFolderName}/index`; // block 的相对路径，用于 page 里生成的地址
  // /index 要求模块必须包含 index.js | index.html 文件
  // 预览页面
  if (preview) {
    componentPath = `./blocks/${blockFolderName}/index`;
    outputPath = 'src/pages/IceworksPreviewPage/blocks';
  } else if (block.common) {
    componentPath = `../../components/${blockFolderName}/index`;
    outputPath = 'src/components';
  }

  const blockClassName = uppercamelcase(block.alias || block.className || block.name);

  const basename = block.name;

  return {
    className: blockClassName,
    name: basename,
    outputPath: path.join(cwd, outputPath, blockFolderName),
    path: componentPath,
    srcPath: path.join(cwd, 'src'),
  };
};
