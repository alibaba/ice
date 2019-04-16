const logger = require('../logger');
const project = require('../project');
const material = require('../material');
const ScaffoldResult = require('../ScaffoldResult');

module.exports = async function addBlocks({ cwd, name: pageName, blocks, preview = false, nodeFramework }) {
  await project.checkExists(cwd);
  const pkgData = await project.getPackageData(cwd);
  const packageDependencies = pkgData.dependencies || {};
  const blocksResult = new ScaffoldResult();

  logger.info('packageDependencies', packageDependencies);
  const blockAppendDependencies = {}; // 收集项目依赖
  if (Array.isArray(blocks) && blocks.length > 0) {
    blocks.forEach((block) => {
      const blockDependencies = material.getDependencies(block);
      Object.entries(blockDependencies).forEach(([name, version]) => {
        if (!(name in packageDependencies)) {
          blockAppendDependencies[name] = version;
        }
      });
    });
  }

  logger.info('blockAppendDependencies', blockAppendDependencies);

  blocksResult.appendDependencies(blockAppendDependencies);

  if (Array.isArray(blocks) && blocks.length > 0) {
    for (var i = 0; i < blocks.length; i++) {
      const block = blocks[i];
      let blockExtractedFiles = [];
      const blockPaths = material.getBlockPaths({
        cwd,
        name: pageName,
        block,
        preview,
        nodeFramework
      });
      if (block.type != 'custom') {
        const tarballURL = await material.getTarball(block);
        blockExtractedFiles = await material.extractTarball({
          url: tarballURL,
          output: blockPaths.outputPath,
          srcPath: blockPaths.srcPath,
          source: block.source,
        });
      } else {
        blockExtractedFiles = await material.extractCustomBlock({
          block: block,
          output: blockPaths.outputPath
        });
      }

      logger.info('blockExtractedFiles', blockExtractedFiles);

      blocksResult.appendFiles(blockExtractedFiles);
    }
  }

  return blocksResult;
};
