const path = require('path');
const fs = require('fs');

module.exports = (cwd, deps = {}) => {
  return new Promise((resolve, reject) => {
    const packageFilePath = path.join(cwd, 'package.json');
    const packageContents = fs.readFileSync(packageFilePath);

    try {
      const packageData = JSON.parse(packageContents);
      packageData.dependencies = Object.assign(deps, packageData.dependencies);

      fs.writeFileSync(packageFilePath, JSON.stringify(packageData, null, 2));
      resolve();
    } catch (e) {
      reject();
    }
  });
};
