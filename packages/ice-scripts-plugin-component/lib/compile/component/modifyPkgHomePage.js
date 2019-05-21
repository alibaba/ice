const path = require('path');
const fse = require('fs-extra');
const npmUtils = require('ice-npm-utils');

module.exports = (pkg, context) => {
  // modify pkg home page
  const { name, version } = pkg;
  const pkgPath = path.resolve(context, 'package.json');
  const homepage = `${npmUtils.getUnpkgHost(name)}/${name}@${version}/build/index.html`;
  pkg.homepage = homepage;
  fse.writeJsonSync(pkgPath, pkg, {
    spaces: 2,
  });
};
