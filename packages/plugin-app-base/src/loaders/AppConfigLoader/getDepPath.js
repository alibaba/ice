const { join } = require('path');

/**
 * ./pages/foo -> based on src, return original
 * /pages/foo -> based on rootContext
 * pages/foo -> based on src, add prefix: './'
 */
// Todo: Will support ice later
module.exports = function getDepPath(path, rootContext = '') {
  return join(rootContext, '.rax', path);
};
