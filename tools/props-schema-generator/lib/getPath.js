const { join } = require('path');
const { existsSync, statSync } = require('fs');

const postfix = {
  name: ['index'],
  extension: ['.js', '.jsx'],
};

module.exports = function(currentPath, path) {
  const resolvedPath = join(currentPath, path);
  if (existsSync(resolvedPath)) {
    if (statSync(resolvedPath).isDirectory()) {
      return tryExtension(join(resolvedPath, 'index'));
    } else {
      return resolvedPath;
    }
  } else {
    return tryExtension(resolvedPath);
  }
  throw new TypeError('没有找到该文件');
};

function tryExtension(path) {
  for (let i = 0; i < postfix.extension.length; i++) {
    const resolvedPath = path + postfix.extension[i];
    if (existsSync(resolvedPath)) {
      return resolvedPath;
    }
  }
  throw new TypeError('没有找到该文件');
}
