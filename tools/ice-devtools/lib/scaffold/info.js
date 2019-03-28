/**
 * 即将废弃的代码
 */

const { getUnpkgHost } = require('ice-npm-utils');
const pkgJSON = require('../../utils/pkg-json');

module.exports = function info(cwd) {
  const pkg = pkgJSON.getPkgJSON(cwd);
  const version = pkg.version;
  const pkgName = pkg.name;

  const screenshotUrl = `${getUnpkgHost(pkgName)}/${pkgName}@${version}/screenshot.png`;
  const homepage = `${getUnpkgHost(pkgName)}/${pkgName}@${version}/build/index.html`;

  pkg.homepage = homepage;
  pkg.scaffoldConfig.screenshot = screenshotUrl;
  pkgJSON.writePkgJSON(pkg, cwd);
};
