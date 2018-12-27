const pkgJSON = require('../../utils/pkg-json');
const innerNet = require('../../utils/inner-net');

module.exports = function info(cwd) {
  const pkg = pkgJSON.getPkgJSON(cwd);
  const pkgName = pkg.name;
  const forInnerNet = innerNet.isTnpm(pkgName);

  let screenshotUrl = `https://unpkg.com/${pkgName}/screenshot.png`;
  let homepage = `https://unpkg.com/${pkgName}/build/index.html`;
  if (forInnerNet) {
    screenshotUrl = `https://unpkg.alibaba-inc.com/${pkgName}/screenshot.png`;
    homepage = `https://unpkg.alibaba-inc.com/${pkgName}/build/index.html`;
  }

  pkg.homepage = homepage;
  pkg.blockConfig.screenshot = screenshotUrl;
  pkgJSON.writePkgJSON(pkg, cwd);
};
