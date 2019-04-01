const { getUnpkgHost } = require('ice-npm-utils');
const pkgJSON = require('../../utils/pkg-json');

module.exports = function info(cwd) {
  const pkg = pkgJSON.getPkgJSON(cwd);

  const version = pkg.version;
  const pkgName = pkg.name;

  const homepage = `${getUnpkgHost(pkgName)}/${pkgName}@${version}/build/index.html`;

  pkg.homepage = homepage;
  pkgJSON.writePkgJSON(pkg, cwd);
};
