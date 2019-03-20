/**
 * 根据模板 npm 包名初始化项目
 */
const path = require('path');
const fse = require('fs-extra');
const uuid = require('uuid/v1');
const log = require('../utils/log');
const download = require('./download');
const rimraf = require('rimraf');

module.exports = ({ scaffold, projectDir }) => {
  // TODO: 检测 projectDir 是否为空文件夹
  return download({
    npmName: scaffold,
    projectDir
  }).then(() => {
    try {
      // 删除 build/
      rimraf.sync(path.join(projectDir, 'build'));

      // 修正 package.json
      modifyPkg(path.join(projectDir, 'package.json'));
    } catch(err) {
      log.warn('修正项目文件失败', err);
    }
  });

}

function modifyPkg(pkgPath) {
  const pkgData = fse.readJsonSync(pkgPath);

  delete pkgData.files;
  delete pkgData.publishConfig;
  delete pkgData.buildConfig.output;
  delete pkgData.scaffoldConfig;
  delete pkgData.homepage;

  pkgData.name += uuid();

  fse.writeJSONSync(pkgPath, pkgData, {
    spaces: 2
  });
  return;
}
