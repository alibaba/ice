/**
 * 构建组件
 */
const fse = require('fs-extra');
const path = require('path');
const npmUtils = require('ice-npm-utils');
const cliInstance = require('../utils/cliInstance');
const buildSrc = require('./buildSrc');
const buildDemo = require('./buildDemo');
const { appDirectory } = require('../config/paths');
const getBuildConfig = require('../config/getBuildConfig');

module.exports = function (pkgData) {
  const buildSrcBuildConfig = getBuildConfig(pkgData, 'buildSrc');
  const buildDemoBuildConfig = getBuildConfig(pkgData, 'buildDemo');

  if (cliInstance.get('skipDemo')) {
    buildSrc(buildSrcBuildConfig);
    return;
  }

  // 放在回调中执行，是为了避免两个任务的 log 信息混在一起
  buildDemo(buildDemoBuildConfig, (err) => {
    if (!err) {
      // modify package.json homepage
      modifyPkgHomePage();

      buildSrc(buildSrcBuildConfig);
    }
  });
};


function modifyPkgHomePage() {
  const pkgPath = path.resolve(appDirectory, 'package.json');
  const pkg = fse.readJsonSync(pkgPath);

  const version = pkg.version;
  const pkgName = pkg.name;
  const homepage = `${npmUtils.getUnpkgHost(pkgName)}/${pkgName}@${version}/build/index.html`;

  pkg.homepage = homepage;
  fse.writeJsonSync(pkgPath, pkg, {
    spaces: 2,
  });
}
