/* eslint-disable camelcase */
import { decamelize } from 'humps';
import { retainKeys, camelizeKeys } from './constants.js';
import type { Page, PHAPage, PageConfig, Manifest, PHAManifest } from './types';

interface TransformOptions {
  isRoot?: boolean;
  parentKey?: string;
}

interface ParseOptions {
  publicPath: string;
  template?: boolean;
  urlSuffix?: string;
}

export function transformManifestKeys(manifest: Manifest, options?: TransformOptions): PHAManifest {
  const { parentKey, isRoot } = options;
  const data = {};

  for (let key in manifest) {
    // filter not need key
    if (isRoot && !retainKeys.includes(key)) {
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

function getPageConfig(routeId: string): PageConfig {
  // filter valid configs
  return {};
}

function renderPageDocument(routeId: string): string {
  return '';
}

function getPageManifest(page: Page, options: ParseOptions): PHAPage {
  const { template } = options;
  // source frame
  if (typeof page === 'string') {
    // get html content by render document
    const pageConfig = getPageConfig(page);
    const { name, query_params = '', ...rest } = pageConfig;
    const pageManifest: PHAPage = {
      key: name || page,
      ...rest,
    };
    if (template && !Array.isArray(pageConfig.frames)) {
      pageManifest.document = renderPageDocument(page);
    } else {
      pageManifest.path = `${getPageUrl(page, options)}${query_params ? `?${query_params}` : ''}`;
    }
  // url frame
  } else if (page.url) {
    const { url, ...rest } = page;
    return {
      path: url,
      ...rest,
    };
  }
  // return page config while it may config as pha manifest standard
  return page as PHAPage;
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

function parseManifest(manifest: Record<string, any>, options: ParseOptions) {
  const { publicPath } = options;

  const { app_worker, tab_bar, pages } = manifest;

  if (app_worker?.url && !app_worker.url.startsWith('http')) {
    app_worker.url = `${publicPath}${app_worker.url}`;
  }

  if (tab_bar?.source && validateSource(tab_bar.source, 'tabBar')) {
    if (!tab_bar.url) {
      // TODO: iOS issue
      // TODO: should remove it in PHA 2.x
      // PHA 1.x should inject `url` to be a base url to load assets
      const tabBarRouteId = parseRouteId(tab_bar.source);
      tab_bar.url = getPageUrl(tabBarRouteId, options);

      // TODO: Android issue
      // TODO: should remove it in PHA 2.x
      // same as iOS issue
      try {
        tab_bar.name = new URL(tab_bar.url).origin;
      } catch (e) {
        // HACK: build type of Weex will inject an invalid URL,
        // which will throw Error when stringify using `new URL()`
        // invalid URL: {{xxx}}/path
        // {{xxx}} will replace by server
        [tab_bar.name] = tab_bar.url.split('/');
      }
    }
    // remove tab_bar.source because pha manifest do not recognize it
    delete tab_bar.source;
  }

  // items is `undefined` will crash in PHA
  if (!tab_bar.items) {
    tab_bar.items = [];
  }

  if (pages && pages.length > 0) {
    manifest.pages = pages.map((page) => {
      // deal with frames
      if (page.frames && page.frames.length > 0) {
        page.frames = page.frames.map((frame) => getPageManifest(frame, options));
      }

      if (page?.tab_header?.source) {
        const headerRouteId = parseRouteId(page.tab_header.source);
        if (!page.tab_header.url) {
          page.tab_header.html = renderPageDocument(headerRouteId);
        }
        // TODO: iOS issue
        // TODO: should remove it in PHA 2.x
        // PHA 1.x should inject `url` to be a base url to load assets
        page.tab_header.url = getPageUrl(headerRouteId, options);
        // TODO: Android issue
        // TODO: should remove it in PHA 2.x
        // same as iOS issue
        try {
          page.tab_header.name = new URL(page.tab_header.url).origin;
        } catch (e) {
          // HACK: build type of Weex will inject an invalid URL,
          // which will throw Error when stringify using `new URL()`
          // invalid URL: {{xxx}}/path
          // {{xxx}} will replace by server
          [page.tab_header.name] = page.tab_header.url.split('/');
        }
        delete page.tab_header.source;
      }
      return getPageManifest(page, options);
    });
  }
}