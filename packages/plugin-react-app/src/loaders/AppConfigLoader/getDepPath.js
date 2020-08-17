const { join } = require('path');
const { existsSync } = require('fs-extra');

function existsFile(path) {
  return ['.js', '.tsx', '.jsx', '.ts'].some(ext => existsSync(`${path}${ext}`));
}

/**
 * ./pages/foo -> based on src, return original
 * /pages/foo -> based on rootContext
 * pages/foo -> based on src, add prefix: './'
 */
module.exports = function getDepPath(path, rootContext = '') {
  if (path[0] === '.') {
    return path;
  } else if (path[0] === '/') {
    return existsFile(path) ? path : join(rootContext, path);
  } else {
    return `./${path}`;
  }
};
