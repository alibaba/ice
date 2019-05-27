const path = require('path');
const { getPkgJSONSync } = require('./pkgJson');

const defaultPackageVersion = {
  react: '16.8.6',
  'react-dom': '16.8.6',
  '@alifd/next': '1.14.3',
  moment: '2.24.0',
};
module.exports = (packages, context) => {
  const res = {};
  packages.forEach((packageName) => {
    let version;
    try {
      const pkg = getPkgJSONSync(path.join(context, 'node_modules', packageName));
      version = pkg.version;
    } catch (err) {
      version = defaultPackageVersion[packageName];
    }
    res[packageName] = version;
  });
  return res;
};
