const { join } = require('path');

/**
 * ./pages/foo -> based on src, return original
 * /pages/foo -> based on rootContext
 * pages/foo -> based on src, add prefix: './'
 */
// Todo: Will support ice later
module.exports = function getDepPath(path, rootContext = '') {
  const splitPath = path.split('/');
  splitPath[splitPath.length - 1] = 'Page';
  const newPath = splitPath.join('/');
  return join(rootContext, '.rax', newPath);
};
