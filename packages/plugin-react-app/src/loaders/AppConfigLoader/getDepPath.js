/**
 * ./pages/foo -> based on src, return original
 * / -> based on absolute path
 * pages/foo -> based on src, add prefix: './'
 */
module.exports = function getDepPath(path) {
  if (path[0] === '.' || path[0] === '/') {
    return path;
  } else {
    return `./${path}`;
  }
};
