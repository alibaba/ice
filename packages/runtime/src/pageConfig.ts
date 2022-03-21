/**
 * merge page config for matched route
 * @param matches
 * @param routeData
 * @returns
 */
export function mergePageConfig(matches, routeData) {
  const result = {};

  matches.forEach(match => {
    const { id } = match.route;
    const pageConfig = routeData?.[id]?.pageConfig;

    // TODO: should concat meta/links/scripts
    Object.assign(result, pageConfig);
  });

  return result;
}