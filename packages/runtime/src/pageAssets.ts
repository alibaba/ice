/**
 * merge assets info for matched route
 * @param matches
 * @param routeAssets
 * @returns
 */
export function mergePageAssets(matches, routeAssets) {
  const links = [];
  const scripts = [];

  matches.forEach(match => {
    const { id } = match.route;
    const linksForRoute = routeAssets[id].links;

    linksForRoute && linksForRoute.forEach((link) => {
      links.push({
        rel: 'stylesheet',
        type: 'text/css',
        href: link,
      });
    });

    const scriptsForRoute = routeAssets[id].scripts;
    scriptsForRoute && scriptsForRoute.forEach((script) => {
      scripts.push({
        src: script,
      });
    });
  });

  return {
    links,
    scripts,
  };
}
