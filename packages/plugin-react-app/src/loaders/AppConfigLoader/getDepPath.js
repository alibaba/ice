const { join } = require('path');
/**
 * ./pages/foo -> based on src, return original
 * /pages/foo -> based on rootContext
 * pages/foo -> based on src, add prefix: './'
 */
module.exports = function getDepPath(path, rootContext = '') {
  if (path[0] === '.') {
    return path;
  } else if (path[0] === '/') {
    return join(rootContext, path);
  } else {
    return `./${path}`;
  }
};
