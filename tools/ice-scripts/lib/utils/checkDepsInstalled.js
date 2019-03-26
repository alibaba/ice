/**
 * 检测是否安装依赖
 */
const path = require('path');
const fs = require('fs');

module.exports = function(projectDirectory) {
  try {
    fs.statSync(path.resolve(projectDirectory, 'node_modules'));
    return true
  } catch(err) {
    return false;
  }
}
