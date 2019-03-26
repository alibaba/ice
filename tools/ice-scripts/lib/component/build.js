/**
 * 构建组件
 */
const fse = require('fs-extra');
const path = require('path');
const cliInstance = require('../utils/cliInstance');
const buildSrc = require('./buildSrc');
const buildDemo = require('./buildDemo');
const { appDirectory } = require('../config/paths');

module.exports = function (buildConfig = {}) {
  if (cliInstance.get('skipDemo')) {
    buildSrc(buildConfig);
    return;
  }

  // HACK：放在回调中执行，是为了避免两个任务的 log 信息混在一起
  buildDemo(buildConfig, (err) => {
    if (!err) {
      // modify package.json homepage
      modifyPkgHomePage();

      buildSrc(buildConfig);
    }
  });
};


function modifyPkgHomePage() {
  const pkgPath = path.resolve(appDirectory, 'package.json');
  const pkg = fse.readJsonSync(pkgPath);

  const version = pkg.version;
  const pkgName = pkg.name;

  if (/^(@alife|@ali|@alipay)/.test(pkgName)) {
    homepage = `https://unpkg.alibaba-inc.com/${pkgName}@${version}/build/index.html`;
  } else {
    homepage = `https://unpkg.com/${pkgName}@${version}/build/index.html`;
  }

  pkg.homepage = homepage;
  fse.writeJsonSync(pkgPath, pkg, {
    spaces: 2
  });
}
