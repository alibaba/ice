/**
 * 获取区块的生成路径，存放路径，相对于区块的路径
 */
const path = require('path');
const uppercamelcase = require('uppercamelcase');
const { getClientFolderName } = require('../utils');

module.exports = function getBlockPaths({ cwd, name, block, preview, nodeFramework = '' }) {
  const blockFolderName = block.alias || block.className || uppercamelcase(block.name); // block 目录名

  const pageFolderName = name;

  const clientFolder = getClientFolderName(nodeFramework);

  let outputPath = path.join(clientFolder, 'pages', pageFolderName, 'components');
  let componentPath = `./components/${blockFolderName}/index`; // block 的相对路径，用于 page 里生成的地址
  // /index 要求模块必须包含 index.js | index.html 文件
  // 预览页面
  if (preview) {
    componentPath = `./blocks/${blockFolderName}/index`;
    outputPath = path.join(clientFolder, 'pages/IceworksPreviewPage/blocks');
  } else if (block.common) {
    componentPath = `../../components/${blockFolderName}/index`;
    outputPath = path.join(clientFolder, 'components');
  }

  const blockClassName = uppercamelcase(block.alias || block.className || block.name);

  const basename = block.name;

  return {
    className: blockClassName,
    name: basename,
    outputPath: path.join(cwd, outputPath, blockFolderName),
    path: componentPath,
    srcPath: path.join(cwd, clientFolder),
  };
};
