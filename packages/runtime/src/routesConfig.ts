import type { RouteMatch, LoadersData, LoaderData, RouteConfig } from './types.js';

export function getMeta(
  matches: RouteMatch[],
  loadersData: LoadersData,
): React.MetaHTMLAttributes<HTMLMetaElement>[] {
  return getMergedValue('meta', matches, loadersData) || [];
}

export function getLinks(
  matches: RouteMatch[],
  loadersData: LoadersData,
): React.LinkHTMLAttributes<HTMLLinkElement>[] {
  return getMergedValue('links', matches, loadersData) || [];
}

export function getScripts(
  matches: RouteMatch[],
  loadersData: LoadersData,
): React.ScriptHTMLAttributes<HTMLScriptElement>[] {
  return getMergedValue('scripts', matches, loadersData) || [];
}

export function getTitle(matches: RouteMatch[], loadersData: LoadersData): string {
  return getMergedValue('title', matches, loadersData);
}

/**
 * merge value for each matched route
 */
function getMergedValue(key: string, matches: RouteMatch[], loadersData: LoadersData) {
  let result;
  for (let match of matches) {
    const routeId = match.route.id;
    const data = loadersData[routeId]?.pageConfig;
    const value = data?.[key];

    if (Array.isArray(value)) {
      // merge array
      result = result ? result.concat(value) : value;
    } else if (value) {
      // overwrite
      result = value;
    }
  }

  return result;
}

/**
 * update routes config to document.
 */
export async function updateRoutesConfig(loaderData: LoaderData) {
  const routeConfig = loaderData?.pageConfig;

  const title = routeConfig?.title;

  if (title) {
    document.title = title;
  }
  const meta = routeConfig?.meta || [];
  const links = routeConfig?.links || [];
  const scripts = routeConfig?.scripts || [];

  await Promise.all([
    updateMeta(meta),
    updateAssets('link', links),
    updateAssets('script', scripts),
  ]);
}


/**
 * find meta by 'next-meta-count' and update it
 */
function updateMeta(meta: RouteConfig['meta']): void {
  const headEl = document.head;
  const metaCountEl: HTMLMetaElement = headEl.querySelector(
    'meta[name=ice-meta-count]',
  ) as HTMLMetaElement;

  if (!metaCountEl) {
    console.warn('Can not find meta element.');
    return;
  }

  const headCount = Number(metaCountEl.content);
  const oldTags: Element[] = [];

  for (
    let i = 0, j = metaCountEl.previousElementSibling;
    i < headCount;
    i++, j = j?.previousElementSibling
  ) {
    if (j?.tagName?.toLowerCase() === 'meta') {
      oldTags.push(j!);
    }
  }

  const newTags = meta.map(item => {
    return reactElementToDOM('meta', item);
  });

  oldTags.forEach((t) => t.parentNode!.removeChild(t));
  newTags.forEach((t) => headEl.insertBefore(t, metaCountEl));

  metaCountEl.content = (newTags.length).toString();
}

const DOMAttributeNames: Record<string, string> = {
  acceptCharset: 'accept-charset',
  className: 'class',
  htmlFor: 'for',
  httpEquiv: 'http-equiv',
  noModule: 'noModule',
};

type ElementProps = RouteConfig['meta'][0] | RouteConfig['links'][0] | RouteConfig['scripts'][0];

/**
 * map element props to dom
 * https://github.com/vercel/next.js/blob/canary/packages/next/client/head-manager.ts#L9
 */
function reactElementToDOM(type: string, props: ElementProps): HTMLElement {
  const el: HTMLElement = document.createElement(type);

  for (const p in props) {
    // we don't render undefined props to the DOM
    if (props[p] === undefined) continue;

    const attr = DOMAttributeNames[p] || p.toLowerCase();
    if (
      type === 'script' &&
      (attr === 'async' || attr === 'defer' || attr === 'noModule')
    ) {
      (el as HTMLScriptElement)[attr] = !!props[p];
    } else {
      el.setAttribute(attr, props[p]);
    }
  }

  return el;
}

const looseToArray = <T extends {}>(input: any): T[] => [].slice.call(input);

/**
 * Load links/scripts for current page.
 * Remove links/scripts for the last page.
 */
async function updateAssets(type: string, assets: RouteConfig['links'] | RouteConfig['scripts']) {
  const oldTags: HTMLStyleElement[] = looseToArray<HTMLStyleElement>(
    document.querySelectorAll(`${type}[data-route-${type}]`),
  );

  await Promise.all(assets.map((asset) => {
    return appendTags(type, asset);
  }));

  oldTags.forEach((tag) => {
    // In some parcel case oldTags may be removed by other routes.
    tag.parentNode?.removeChild(tag);
  });
}

async function appendTags(type: string, props: ElementProps) {
  return new Promise((resolve, reject) => {
    const tag = reactElementToDOM(type, props);

    tag.setAttribute(`data-route-${type}`, 'true');

    tag.onload = () => {
      resolve(null);
    };

    tag.onerror = () => {
      reject();
    };

    document.head.appendChild(tag);
  });
}
