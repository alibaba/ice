const pkgJSON = require('../../utils/pkg-json');
const innerNet = require('../../utils/inner-net');

module.exports = function info(cwd) {
  const pkg = pkgJSON.getPkgJSON(cwd);
  
  const version = pkg.version;
  const pkgName = pkg.name;
  const forInnerNet = innerNet.isTnpm(pkgName);

  let homepage = `https://unpkg.com/${pkgName}@${version}/build/index.html`;
  if (forInnerNet) {
    homepage = `https://unpkg.alibaba-inc.com/${pkgName}@${version}/build/index.html`;
  }

  pkg.homepage = homepage;
  pkgJSON.writePkgJSON(pkg, cwd);
};
