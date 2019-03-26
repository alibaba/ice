/**
 * 检测是否安装依赖
 */
const path = require('path');
const fs = require('fs');

module.exports = function(projectDirectory) {
  try {
    const files = fs.readdirSync(path.resolve(projectDirectory, 'node_modules'));
    return files.length > 0;
  } catch(err) {
    return false;
  }
}
