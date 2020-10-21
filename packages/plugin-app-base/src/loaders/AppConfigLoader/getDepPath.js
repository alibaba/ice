const { join } = require('path');
const formatWinPath = require('../../utils/formatWinPath');

/**
 * ./pages/foo -> based on src, return original
 * /pages/foo -> based on rootContext
 * pages/foo -> based on src, add prefix: './'
 */
// Todo: Will support ice later
module.exports = function getDepPath(path, rootContext = '') {
  const splitPath = path.split('/');
  splitPath[splitPath.length - 1] = 'Page';
  const tempPagePath = splitPath.join('/');
  return formatWinPath(join(rootContext, '.rax', tempPagePath));
};
