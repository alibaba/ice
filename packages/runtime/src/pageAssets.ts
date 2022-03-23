/**
 * merge assets info for matched route
 * @param matches
 * @param assetsManifest
 * @returns
 */
export function getPageAssets(matches, assetsManifest) {
  const { bundles } = assetsManifest;

  let assets = [];

  matches.forEach(match => {
    const { componentName } = match.route;
    const routeAssets = bundles[componentName];

    if (routeAssets) {
      assets = assets.concat(routeAssets);
    }
  });

  return assets;
}
