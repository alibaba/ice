/**
 * 根据模板 npm 包名初始化项目
 */
const path = require('path');
const fse = require('fs-extra');
const uuid = require('uuid/v1');
const rimraf = require('rimraf');
const { checkAliInternal } = require('ice-npm-utils');

const log = require('../../utils/log');
const download = require('../../utils/download');

module.exports = ({ template, projectDir }) => {
  return download({
    npmName: template,
    projectDir,
  }).then(() => {
    try {
      // 删除 build/
      rimraf.sync(path.join(projectDir, 'build'));

      // 修正 package.json
      modifyPkg(path.join(projectDir, 'package.json'));
    } catch (err) {
      log.warn('修正项目文件失败', err);
    }

    return checkAliInternal();
  }).then((isAliInternal) => {
    if (isAliInternal) {
      // generate abc.json
      generateAbcFile(projectDir);
    }
  });
};

function modifyPkg(pkgPath) {
  log.verbose('modifyPkg', pkgPath);

  const pkgData = fse.readJsonSync(pkgPath);

  delete pkgData.files;
  delete pkgData.publishConfig;
  delete pkgData.buildConfig.output;
  delete pkgData.scaffoldConfig;
  delete pkgData.homepage;
  delete pkgData.scripts.screenshot;
  delete pkgData.scripts.prepublishOnly;

  pkgData.name += uuid();

  fse.writeJSONSync(pkgPath, pkgData, {
    spaces: 2,
  });
}

function generateAbcFile(projectDir) {
  log.info('内网环境，生成 abc.json');

  const abcData = {
    type: 'iceworks',
    builder: '@ali/builder-iceworks',
  };

  fse.writeJSONSync(path.resolve(projectDir, 'abc.json'), abcData, {
    spaces: 2,
  });
}
