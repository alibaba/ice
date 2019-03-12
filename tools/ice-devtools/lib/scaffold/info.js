const pkgJSON = require('../../utils/pkg-json');
const innerNet = require('../../utils/inner-net');

module.exports = function info(cwd) {
  const pkg = pkgJSON.getPkgJSON(cwd);
  const version = pkg.version;
  const pkgName = pkg.name;
  const forInnerNet = innerNet.isTnpm(pkgName);

  let screenshotUrl = `https://unpkg.com/${pkgName}@${version}/screenshot.png`;
  let homepage = `https://unpkg.com/${pkgName}@${version}/build/index.html`;
  if (forInnerNet) {
    screenshotUrl = `https://unpkg.alibaba-inc.com/${pkgName}@${version}/screenshot.png`;
    homepage = `https://unpkg.alibaba-inc.com/${pkgName}@${version}/build/index.html`;
  }

  pkg.homepage = homepage;
  pkg.scaffoldConfig.screenshot = screenshotUrl;
  pkgJSON.writePkgJSON(pkg, cwd);
};
