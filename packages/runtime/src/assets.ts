import type { AssetsManifest, RouteMatch } from './types';
/**
 * merge assets info for matched page
 * @param matches
 * @param assetsManifest
 * @returns
 */
 export function getPageAssets(matches: RouteMatch[], assetsManifest: AssetsManifest): string[] {
  const { bundles, publicPath } = assetsManifest;

  let result = [];

  matches.forEach(match => {
    const { componentName } = match.route;
    const assets = bundles[componentName];
    assets && assets?.files.forEach(filePath => {
      result.push(`${publicPath}${filePath}`);
    });
  });

  return result;
}

export function getEntryAssets(assetsManifest: AssetsManifest): string[] {
  const { bundles, publicPath } = assetsManifest;
  const assets = [];
  Object.keys(bundles).forEach(key => {
    const { isEntry, files } = bundles[key];
    if (isEntry) {
      assets.push(...files);
    }
  });
  return assets.map(filePath => `${publicPath}${filePath}`);
}