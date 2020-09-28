/**
 * Generate entryname by route.path
 * Example: '/about/' -> 'about/index'
 */
module.exports = (path) => {
  let entryName = 'index';

  if (path && path !== '/') {
    entryName = `${path.replace(/^\/|\/$/g, '')}/index`;
  }

  return entryName;
};
