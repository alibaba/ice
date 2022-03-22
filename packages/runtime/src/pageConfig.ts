/**
 * get page config for matched route
 * @param matches
 * @param routeData
 * @returns
 */
export function getPageConfig(matches, routeData) {
  const lastIndex = matches.length - 1;
  const page = matches[lastIndex];
  const { id } = page.route;
  const pageConfig = routeData?.[id]?.pageConfig;

  return pageConfig;
}