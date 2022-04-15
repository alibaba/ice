import type { AssetsManifest, RouteMatch } from './types';

/**
 * merge assets info for matched page
 */
export function getPageAssets(matches: RouteMatch[], assetsManifest: AssetsManifest): string[] {
  // TODO：publicPath from runtime
  const { pages, publicPath } = assetsManifest;

  let result = [];

  matches.forEach(match => {
    const { componentName } = match.route;
    const assets = pages[componentName];
    assets && assets.forEach(filePath => {
      result.push(`${publicPath}${filePath}`);
    });
  });

  return result;
}

export function getEntryAssets(assetsManifest: AssetsManifest): string[] {
  const { entries, publicPath } = assetsManifest;
  let result = [];

  Object.values(entries).forEach(assets => {
    result = result.concat(assets);
  });

  return result.map(filePath => `${publicPath}${filePath}`);
}

/**
 * Load links for the next page.
 */
export async function loadStyleLinks(links): Promise<void> {
  if (!links?.length) return;

  const matchedLinks = links.filter(link => {
    const existingTags = document.querySelectorAll(`link[href='${link.href}']`);
    return !existingTags.length;
  });

  await Promise.all(matchedLinks.map((link) => {
    return preLoadAssets('link', link);
  }));
}

/**
 * Load scripts for the next page.
 */
export async function loadScripts(scripts): Promise<void> {
  if (!scripts?.length) return;

  const matchedScript = scripts.filter(script => {
    const existingTags = document.querySelectorAll(`script[scr='${script.src}']`);
    return !existingTags.length;
  });

  await Promise.all(matchedScript.map((script) => {
    return preLoadAssets('script', script);
  }));
}

/**
 * PreLoad assets by create tag.
 * Remove this tag after onload.
 * Actual tag will be created by rendering Document.
 */
async function preLoadAssets(type, props): Promise<void> {
  return new Promise(resolve => {
    let tag = document.createElement(type);
    Object.assign(tag, props);

    function removeTag() {
      // if a navigation interrupts this prefetch React will update the <head>
      // and remove the link we put in there manually, so we check if it's still
      // there before trying to remove it
      if (document.head.contains(tag)) {
        document.head.removeChild(tag);
      }
    }

    tag.onload = () => {
      // FIXME: Style link reloads on real DOM rendering if caching is disabled.
      // ISSUE: https://github.com/ice-lab/ice-next/issues/90
      removeTag();
      resolve();
    };

    tag.onerror = () => {
      removeTag();
      resolve();
    };

    document.head.appendChild(tag);
  });
}