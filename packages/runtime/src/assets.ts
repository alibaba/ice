/**
 * merge assets info for matched page
 * @param matches
 * @param assetsManifest
 * @returns
 */
 export function getPageAssets(matches, assetsManifest) {
  const { bundles, publicPath } = assetsManifest;

  let result = [];

  matches.forEach(match => {
    const { componentName } = match.route;
    const assets = bundles[componentName];

    assets && assets.forEach(filePath => {
      result.push(`${publicPath}${filePath}`);
    });
  });

  return result;
}

export function getEntryAssets(assetsManifest) {
  const { bundles, publicPath } = assetsManifest;

  const assets = bundles['main'];

  return assets.map(filePath => `${publicPath}${filePath}`);
}