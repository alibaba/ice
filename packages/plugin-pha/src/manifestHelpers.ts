/* eslint-disable camelcase */
import { decamelize } from 'humps';
import { decamelizeKeys, camelizeKeys } from './constants.js';
import type { Page, PHAPage, PageConfig, Manifest, PHAManifest } from './types';

interface TransformOptions {
  isRoot?: boolean;
  parentKey?: string;
}

interface ParseOptions {
  publicPath: string;
  configEntry: string;
  serverEntry: string;
  template?: boolean;
  urlSuffix?: string;
  ssr?: boolean;
}

type MixedPage = PHAPage & PageConfig;

export function transformManifestKeys(manifest: Manifest, options?: TransformOptions): PHAManifest {
  const { parentKey, isRoot } = options;
  const data = {};

  for (let key in manifest) {
    // filter not need transform key
    if (isRoot && !decamelizeKeys.includes(key)) {
      continue;
    }
    const value = manifest[key];

    // compatible tabHeader
    if (key === 'pageHeader') {
      key = 'tabHeader';
    }

    let transformKey = key;
    if (!camelizeKeys.includes(key)) {
      transformKey = decamelize(key);
    }
    // flatten window config
    if (typeof value === 'string' || typeof value === 'number') {
      data[transformKey] = value;
    } else if (Array.isArray(value)) {
      data[transformKey] = value.map((item) => {
        if (parentKey === 'tabBar' && item.text) {
          item.name = item.text;
          delete item.text;
        }
        if (typeof item === 'object') {
          if (key === 'dataPrefetch') {
            // hack: No header will crash in Android
            if (!item.header) {
              item.header = {};
            }
            // no prefetchKey will crash in Android TaoBao 9.26.0
            if (!item.prefetchKey) {
              item.prefetchKey = 'mtop';
            }
          }
          return transformManifestKeys(item, { isRoot: false, parentKey: key });
        }
        return item;
      });
    } else if (key === 'requestHeaders') {
      // keys of requestHeaders should not be transformed
      data[transformKey] = value;
    } else if (typeof value === 'object' && !(parentKey === 'dataPrefetch' && (key === 'header' || key === 'data'))) {
      data[transformKey] = transformManifestKeys(value, { isRoot: false, parentKey: key });
    } else {
      data[transformKey] = value;
    }
  }
  return data;
}

function getPageUrl(routeId: string, options: ParseOptions) {
  const { publicPath, urlSuffix = '' } = options;
  return `${publicPath}${routeId}${urlSuffix}`;
}

async function getPageConfig(routeId: string, configEntry: string): Promise<MixedPage> {
  const routeConfig = await import(configEntry);
  // TODO: filter valid configs
  return routeConfig[routeId] as MixedPage;
}

async function renderPageDocument(routeId: string, serverEntry: string): Promise<string> {
  const serverContext = {
    req: {
      url: routeId,
    },
  };
  const serverModule = await import(serverEntry);
  const { value } = await serverModule.renderToHTML(serverContext, true);
  return value;
}

async function getPageManifest(page: string | Page, options: ParseOptions): Promise<MixedPage> {
  const { template, serverEntry, configEntry } = options;
  // source frame
  if (typeof page === 'string') {
    // get html content by render document
    const pageConfig = await getPageConfig(page, configEntry);
    const { name, query_params = '', ...rest } = pageConfig;
    const pageManifest = {
      key: name || page,
      ...rest,
    };
    if (template && !Array.isArray(pageConfig.frames)) {
      pageManifest.document = await renderPageDocument(page, serverEntry);
    } else {
      pageManifest.path = `${getPageUrl(page, options)}${query_params ? `?${query_params}` : ''}`;
    }
    return pageManifest;
  } else if (page.url) {
    // url frame
    const { url, ...rest } = page;
    return {
      path: url,
      ...rest,
    };
  }
  // return page config while it may config as pha manifest standard
  return page;
}

const PAGE_SOURCE_REGEX = /^\.?\/?pages\//;

function validateSource(source: string, key: string): boolean {
  if (!source.match(PAGE_SOURCE_REGEX)) {
    throw new Error(`${key} source must be written in pages folder`);
  }
  return true;
}

function parseRouteId(id: string): string {
  return id.replace(PAGE_SOURCE_REGEX, '');
}

export async function parseManifest(manifest: Manifest, options: ParseOptions): Promise<PHAManifest> {
  const { publicPath, serverEntry } = options;

  const { appWorker, tabBar, routes } = manifest;

  if (appWorker?.url && !appWorker.url.startsWith('http')) {
    appWorker.url = `${publicPath}${appWorker.url}`;
  }

  if (tabBar?.source && validateSource(tabBar.source, 'tabBar')) {
    if (!tabBar.url) {
      // TODO: iOS issue
      // TODO: should remove it in PHA 2.x
      // PHA 1.x should inject `url` to be a base url to load assets
      const tabBarRouteId = parseRouteId(tabBar.source);
      tabBar.url = getPageUrl(tabBarRouteId, options);
      // TODO: Android issue
      // TODO: should remove it in PHA 2.x
      // same as iOS issue
      try {
        tabBar.name = new URL(tabBar.url).origin;
      } catch (e) {
        // HACK: build type of Weex will inject an invalid URL,
        // which will throw Error when stringify using `new URL()`
        // invalid URL: {{xxx}}/path
        // {{xxx}} will replace by server
        [tabBar.name] = tabBar.url.split('/');
      }
    }
    // remove tab_bar.source because pha manifest do not recognize it
    delete tabBar.source;
  }
  // items is `undefined` will crash in PHA
  if (!tabBar.items) {
    tabBar.items = [];
  }
  if (routes && routes.length > 0) {
    manifest.pages = await Promise.all(routes.map(async (page) => {
      if (typeof page !== 'string') {
        // deal with frames
        if (page.frames && page.frames.length > 0) {
          page.frames = await Promise.all(page.frames.map((frame) => getPageManifest(frame, options)));
        }
        if (page?.pageHeader?.source) {
          const headerRouteId = parseRouteId(page.pageHeader.source);
          if (!page.pageHeader.url) {
            page.pageHeader.html = await renderPageDocument(headerRouteId, serverEntry);
          }
          // TODO: iOS issue
          // TODO: should remove it in PHA 2.x
          // PHA 1.x should inject `url` to be a base url to load assets
          page.pageHeader.url = getPageUrl(headerRouteId, options);
          // TODO: Android issue
          // TODO: should remove it in PHA 2.x
          // same as iOS issue
          try {
            page.pageHeader.name = new URL(page.pageHeader.url).origin;
          } catch (e) {
            // HACK: build type of Weex will inject an invalid URL,
            // which will throw Error when stringify using `new URL()`
            // invalid URL: {{xxx}}/path
            // {{xxx}} will replace by server
            [page.pageHeader.name] = page.pageHeader.url.split('/');
          }
          delete page.pageHeader.source;
        }
      }
      return getPageManifest(page, options);
    }));
  }

  return transformManifestKeys(manifest, { isRoot: true });
}