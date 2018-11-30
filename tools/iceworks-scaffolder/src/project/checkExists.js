const pathExists = require('path-exists');
const path = require('path');

module.exports = async function checkProjectExists(cwd) {
  if (pathExists.sync(path.join(cwd, 'package.json'))) {
    return true;
  }
  throw new Error('当前目录不存在 package.json');
};
