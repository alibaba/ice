const { join, dirname, relative, resolve } = require('path');
const { getRoutesByAppJson } = require('@builder/app-helpers');

/**
 *
 * @param {array} appRoutes
 * @param {string} resourcePath
 * @param {string} rootContext
 */
function getProcessedSubAppRoutes(appRoutes, resourcePath, rootContext) {
  return appRoutes.map(route => {
    route.source = relative(join(rootContext, 'src'), resolve(dirname(resourcePath), route.source));
    return route;
  });
}


 /**
  * Get complete route path when using subpackages
  * @param {array} appRoutes
  * @param {string} rootDir
  * @param {string} target
  *
  */
function getProcessedCompleteRoutes(appRoutes, rootDir, target) {
  let completeRoutes = [];
  appRoutes.forEach(app => {
    const subAppRoutes = getRoutesByAppJson(target, { appJsonPath: join(rootDir, 'src', `${app.source}.json`) });
    subAppRoutes.forEach(route => route.source = join(dirname(app.source), route.source));
    completeRoutes = completeRoutes.concat(subAppRoutes);
  });
  return completeRoutes;
}

module.exports = {
  getProcessedCompleteRoutes,
  getProcessedSubAppRoutes
};
