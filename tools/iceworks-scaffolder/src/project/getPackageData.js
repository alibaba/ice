const fs = require('fs');
const path = require('path');

module.exports = async function getPackageJson(cwd) {
  const pkgFile = path.join(cwd, 'package.json');

  let pkgData;
  try {
    pkgData = fs.readFileSync(pkgFile, 'utf-8');
    pkgData = JSON.parse(pkgData);
  } catch (err) {
    throw err;
  }
  return pkgData;
};
