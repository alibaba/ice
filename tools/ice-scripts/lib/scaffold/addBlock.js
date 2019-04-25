/**
 * 添加区块
 */
const path = require('path');
const fse = require('fs-extra');
const camelCase = require('camelcase');
const download = require('./download');
const log = require('../utils/log');

module.exports = ({ template, baseDir }) => {
  if (!template) {
    // 添加空白区块
    const blockDirPath = path.resolve(baseDir, 'EmptyBlock');
    const blockTemplatePath = path.resolve(__dirname, '../template/block/SingleBlock');

    return fse.mkdirp(blockDirPath).then(() => {
      return fse.copy(blockTemplatePath, blockDirPath, {
        overwrite: false,
        errorOnExist: true,
      });
    }).then(() => {
      return blockDirPath;
    });
  }

  // 下载 npm 区块
  const tempDir = path.resolve(baseDir, '.ice_scripts_temp');
  let blockDirPath;
  return fse.ensureDir(tempDir)
    .then(() => {
      return download({
        npmName: template,
        projectDir: tempDir,
      });
    })
    .then(() => {
      log.info('start make block dir');
      // eslint-disable-next-line import/no-dynamic-require
      const blockPkg = require(path.join(tempDir, 'package.json'));
      const npmName = blockPkg.name;
      // @icedesign/example-block | example-block
      const name = npmName.split('/')[1] || npmName.split('/')[0];
      const className = camelCase(name, { pascalCase: true });
      blockDirPath = path.resolve(baseDir, className);

      return fse.mkdirp(blockDirPath);
    })
    .then(() => {
      log.info('start copy block src files', blockDirPath);
      return fse.copy(path.join(tempDir, 'src'), blockDirPath, {
        overwrite: false,
        errorOnExist: true,
      });
    })
    .then(() => {
      log.info('start remove temp dir');
      return fse.remove(tempDir);
    })
    .then(() => {
      return blockDirPath;
    });
};
