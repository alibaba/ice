const pkgJSON = require('../../utils/pkg-json');
const innerNet = require('../../utils/inner-net');

module.exports = function info(cwd) {
  const pkg = pkgJSON.getPkgJSON(cwd);
  const pkgName = pkg.name;
  const forInnerNet = innerNet.isTnpm(pkgName);

  let homepage = `https://unpkg.com/${pkgName}@latest/build/index.html`;
  if (forInnerNet) {
    homepage = `https://unpkg.alibaba-inc.com/${pkgName}@latest/build/index.html`;
  }

  pkg.homepage = homepage;
  pkgJSON.writePkgJSON(pkg, cwd);
};
