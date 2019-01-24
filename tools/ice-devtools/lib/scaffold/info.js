const pkgJSON = require('../../utils/pkg-json');
const innerNet = require('../../utils/inner-net');

module.exports = function info(cwd) {
  const pkg = pkgJSON.getPkgJSON(cwd);
  const pkgName = pkg.name;
  const forInnerNet = innerNet.isTnpm(pkgName);

  let screenshotUrl = `https://unpkg.com/${pkgName}@latest/screenshot.png`;
  let homepage = `https://unpkg.com/${pkgName}@latest/build/index.html`;
  if (forInnerNet) {
    screenshotUrl = `https://unpkg.alibaba-inc.com/${pkgName}@latest/screenshot.png`;
    homepage = `https://unpkg.alibaba-inc.com/${pkgName}@latest/build/index.html`;
  }

  pkg.homepage = homepage;
  pkg.scaffoldConfig.screenshot = screenshotUrl;
  pkgJSON.writePkgJSON(pkg, cwd);
};
