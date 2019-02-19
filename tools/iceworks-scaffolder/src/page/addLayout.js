const pathExists = require('path-exists');
const uppercamelcase = require('uppercamelcase');

const logger = require('../logger');
const project = require('../project');
const material = require('../material');
const ScaffoldResult = require('../ScaffoldResult');

module.exports = async function addLayout({ cwd, layout, nodeFramework }) {
  await project.checkExists(cwd);

  const pkgData = await project.getPackageData(cwd);
  const layoutClassName = uppercamelcase(layout.name);
  const packageDependencies = pkgData.dependencies || {};
  const layoutAppendDependencies = {}; // 收集 layout 依赖
  const layoutDependencies = material.getDependencies(layout);

  const layoutResult = new ScaffoldResult();

  Object.entries(layoutDependencies).forEach(([name, version]) => {
    if (!(name in packageDependencies)) {
      layoutAppendDependencies[name] = version;
    }
  });

  logger.info('layoutAppendDependencies', layoutAppendDependencies);

  layoutResult.appendDependencies(layoutAppendDependencies);

  const layoutPaths = material.getLayoutPaths({ cwd, layout, nodeFramework });

  const lyaoutExists = pathExists.sync(layoutPaths.outputPath);

  logger.info('ayoutPaths.outputPath', lyaoutExists, layoutPaths.outputPath);
  // 兼容 layout 不存在的情况, 拉取最新的 layout
  if (!lyaoutExists) {
    // 不存在 Layout 重新生成
    const url = await material.getTarball(layout);
    logger.info('layout tarball url', url);
    const layoutFiles = await material.extractTarballLayout({
      url,
      output: layoutPaths.outputPath,
      projectDir: cwd,
    });

    logger.info('layoutFiles', layoutFiles);
    layoutResult.appendFiles(layoutFiles);
    layoutResult.setOutput('layout', layoutPaths.relativePath);
  } else {
    logger.info('layout', layoutClassName, '存在，跳过生成');
    layoutResult.setOutput('layout', layoutPaths.relativePath);
  }

  return layoutResult;
};
