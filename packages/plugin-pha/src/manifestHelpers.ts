/* eslint-disable camelcase */
import * as path from 'path';
import * as fs from 'fs';
import humps from 'humps';
import consola from 'consola';
import cloneDeep from 'lodash.clonedeep';
import { matchRoutes } from '@remix-run/router';
import * as htmlparser2 from 'htmlparser2';
import { decamelizeKeys, camelizeKeys, validPageConfigKeys } from './constants.js';
import type { Page, PHAPage, PageHeader, PageConfig, Manifest, PHAManifest } from './types';

const { decamelize } = humps;

interface TransformOptions {
  isRoot?: boolean;
  parentKey?: string;
}

export interface ParseOptions {
  urlPrefix: string;
  publicPath: string;
  routeManifest: string;
  routesConfig?: Record<string, any>;
  serverEntry: string;
  template?: boolean;
  urlSuffix?: string;
  ssr?: boolean;
  dataloaderConfig?: object | Function | Array<object | Function>;
}

interface TabConfig {
  name: string;
  url: string;
  html?: string;
}

type MixedPage = PHAPage & PageConfig;

export function transformManifestKeys(manifest: Manifest, options?: TransformOptions): PHAManifest {
  const { parentKey, isRoot } = options;
  const data = {};

  for (let key in manifest) {
    // Filter not need transform key.
    if (isRoot && !decamelizeKeys.includes(key)) {
      continue;
    }
    const value = manifest[key];

    // Compatible with pageHeader.
    if (key === 'pageHeader') {
      key = 'tabHeader';
    }

    let transformKey = key;
    if (!camelizeKeys.includes(key)) {
      transformKey = decamelize(key);
    }

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
            // Hack: No header will crash in Android
            if (!item.header) {
              item.header = {};
            }
            // No prefetchKey will crash in Android TaoBao 9.26.0.
            if (!item.prefetchKey) {
              item.prefetchKey = 'mtop';
            }
          }
          return transformManifestKeys(item, { isRoot: false, parentKey: key });
        }
        return item;
      });
    } else if (key === 'requestHeaders') {
      // Keys of requestHeaders should not be transformed.
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
  const { urlPrefix = '', urlSuffix = '' } = options;
  const splitCharacter = urlPrefix.endsWith('/') ? '' : '/';
  return `${urlPrefix}${splitCharacter}${routeId}${urlSuffix}`;
}

function getRouteManifest(routeManifest: string) {
  try {
    const routes = fs.readFileSync(routeManifest, 'utf-8');
    return JSON.parse(routes);
  } catch (e) {
    console.warn(`[plugin-pha warn] ${JSON.stringify(e)}`);
    return [];
  }
}

async function getPageConfig(
  routeId: string,
  routeManifest: string,
  routesConfig: Record<string, any>,
): Promise<MixedPage> {
  const routes = getRouteManifest(routeManifest);
  const matches = matchRoutes(routes, routeId.startsWith('/') ? routeId : `/${routeId}`);
  let routeConfig: MixedPage = {};
  if (matches) {
    // Merge route config when return muitiple route.
    routeConfig = matches.reduce((prev, curr) => {
      const { id } = curr.route;
      return {
        ...prev,
        ...(routesConfig![id]?.() as MixedPage || {}),
      };
    }, {});
  }
  const filteredConfig = {};
  Object.keys(routeConfig).forEach((key) => {
    if (validPageConfigKeys.includes(key)) {
      filteredConfig[key] = routeConfig[key];
    }
  });
  return filteredConfig;
}

async function renderPageDocument(routeId: string, serverEntry: string): Promise<string> {
  const serverContext = {
    req: {
      url: `/${routeId}`,
    },
  };
  const serverModule = await import(serverEntry);
  const { value } = await serverModule.renderToHTML(serverContext, {
    documentOnly: true,
    serverOnlyBasename: '/',
    renderMode: 'SSG',
  });
  return value;
}

async function getPageManifest(page: string | Page, options: ParseOptions): Promise<MixedPage> {
  const { template, serverEntry, routesConfig, routeManifest } = options;
  // Page will be type string when it is a source frame.
  if (typeof page === 'string') {
    // Get html content by render document.
    const pageConfig = await getPageConfig(page, routeManifest, routesConfig);
    const { queryParams = '', ...rest } = pageConfig;
    const pageManifest = {
      key: page,
      ...rest,
    };
    const html = await renderPageDocument(page, serverEntry);
    if (template && !Array.isArray(pageConfig.frames)) {
      pageManifest.document = html;
    }

    let scripts = [];
    let stylesheets = [];
    function getPreload(dom) {
      if (
        dom.name === 'script' &&
        dom.attribs &&
        dom.attribs.src
      ) {
        scripts.push({
          src: dom.attribs.src,
        });
      } else if (
        dom.name === 'link' &&
        dom.attribs &&
        dom.attribs.href &&
        dom.attribs.rel === 'stylesheet'
      ) {
        stylesheets.push({
          src: dom.attribs.href,
        });
      }

      if (dom.children) {
        dom.children.forEach(getPreload);
      }
    }
    getPreload(htmlparser2.parseDocument(pageManifest.document));
    pageManifest.resource_prefetch = [...scripts, ...stylesheets];


    // Always need path for page item.
    pageManifest.path = `${getPageUrl(page, options)}${queryParams ? `?${queryParams}` : ''}`;
    return pageManifest;
  } else if (page.url) {
    // Url has the highest priority to overwrite config path.
    const { url, ...rest } = page;
    return {
      ...rest,
      path: url,
    };
  }
  // Return page config while it may config as pha manifest standard.
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

async function getTabConfig(tabManifest: Manifest['tabBar'] | PageHeader, generateDocument: boolean, options: ParseOptions): Promise<TabConfig> {
  const tabConfig: TabConfig = {
    name: '',
    url: '',
  };
  const tabRouteId = parseRouteId(tabManifest!.source);
  if (generateDocument && options.serverEntry) {
    tabConfig.html = await renderPageDocument(tabRouteId, options.serverEntry);
  }

  // TODO: iOS issue
  // TODO: should remove it in PHA 2.x
  // PHA 1.x should inject `url` to be a base url to load assets
  tabConfig.url = getPageUrl(tabRouteId, options);
  // TODO: Android issue
  // TODO: should remove it in PHA 2.x
  // same as iOS issue
  try {
    tabConfig.name = new URL(tabConfig.url).origin;
  } catch (e) {
    // HACK: build type of Weex will inject an invalid URL,
    // which will throw Error when stringify using `new URL()`
    // invalid URL: {{xxx}}/path
    // {{xxx}} will replace by server
    [tabConfig.name] = tabConfig.url.split('/');
  }

  return tabConfig;
}

export function getAppWorkerUrl(manifest: Manifest, workerDir: string): string {
  let appWorkerPath: string;
  const defaultAppWorker = path.join(workerDir, 'app-worker.ts');
  if (manifest?.appWorker?.url) {
    const appWorkUrl = path.join(workerDir, manifest.appWorker.url);
    if (!manifest?.appWorker?.url.startsWith('http')) {
      if (fs.existsSync(appWorkUrl)) {
        appWorkerPath = appWorkUrl;
      } else {
        consola.error(`PHA app worker url: ${manifest.appWorker.url} is not exists`);
      }
    }
  } else if (fs.existsSync(defaultAppWorker)) {
    appWorkerPath = defaultAppWorker;
  }

  return appWorkerPath;
}

export function rewriteAppWorker(manifest: Manifest): Manifest {
  let appWorker: Manifest['appWorker'] = {};
  if (manifest.appWorker) {
    appWorker = {
      ...manifest.appWorker,
      url: 'app-worker.js',
    };
  } else {
    appWorker = {
      url: 'app-worker.js',
    };
  }
  return {
    ...manifest,
    appWorker,
  };
}
export function getRouteIdByPage(routeManifest: string, page: Page) {
  const routes = getRouteManifest(routeManifest);
  const routeId = typeof page === 'string' ? page : page?.name;
  const locationArg = routeId?.startsWith('/') ? routeId : `/${routeId}`;
  const matches = matchRoutes(routes, locationArg);
  return (matches || []).map((match) => {
    return match?.route?.id;
  });
}
export async function parseManifest(manifest: Manifest, options: ParseOptions): Promise<PHAManifest> {
  const {
    publicPath,
    dataloaderConfig,
    routeManifest,
  } = options;
  const { appWorker, tabBar, routes } = manifest;

  if (appWorker?.url && !appWorker.url.startsWith('http')) {
    appWorker.url = `${publicPath}${appWorker.url}`;
  }

  if (tabBar?.source && validateSource(tabBar.source, 'tabBar')) {
    if (!tabBar.url) {
      manifest.tabBar = {
        ...tabBar,
        ...(await getTabConfig(tabBar, false, options)),
      };
    }
    // Remove tab_bar.source because pha manifest do not recognize it.
    delete manifest.tabBar.source;
  }
  // items is `undefined` will crash in PHA and it is not supported to config list.
  if (tabBar && !tabBar.items) {
    tabBar.items = [];
  }

  if (routes && routes.length > 0) {
    manifest.pages = await Promise.all(routes.map(async (page) => {
      const pageIds = getRouteIdByPage(routeManifest, page);
      const pageManifest = await getPageManifest(page, options);
      // Set static dataloader to data_prefetch of page.
      pageIds.forEach((pageId) => {
        if (typeof page === 'string' && dataloaderConfig && dataloaderConfig[pageId]) {
          const staticDataLoaders = [];
          if (Array.isArray(dataloaderConfig[pageId])) {
            dataloaderConfig[pageId].forEach(item => {
              if (typeof item === 'object') {
                staticDataLoaders.push(item);
              }
            });
          } else if (typeof dataloaderConfig[pageId] === 'object') {
            // Single prefetch loader config.
            staticDataLoaders.push(dataloaderConfig[pageId]);
          }
          pageManifest.data_prefetch = [...(pageManifest.data_prefetch || []), ...staticDataLoaders];
        }
      });

      if (pageManifest.frames && pageManifest.frames.length > 0) {
        pageManifest.frames = await Promise.all(pageManifest.frames.map((frame) => getPageManifest(frame, options)));
        // Set static dataloader to data_prefetch of frames.
        pageManifest.frames.forEach(frame => {
          const title = frame.title || '';
          const titleIds = getRouteIdByPage(routeManifest, title);
          titleIds.forEach((titleId) => {
            if (dataloaderConfig && dataloaderConfig[titleId]) {
              const staticDataLoaders = [];
              if (Array.isArray(dataloaderConfig[title])) {
                dataloaderConfig[title].forEach(item => {
                  if (typeof item === 'object') {
                    staticDataLoaders.push(item);
                  }
                });
              } else if (typeof dataloaderConfig[title] === 'object') {
                // Single prefetch loader config.
                staticDataLoaders.push(dataloaderConfig[title]);
              }

              frame.data_prefetch = [...(frame.data_prefetch || []), ...staticDataLoaders];
            }
          });
        });
      }

      if (pageManifest?.pageHeader?.source) {
        if (!pageManifest.pageHeader.url) {
          pageManifest.pageHeader = {
            ...pageManifest.pageHeader,
            // Generate document logic is different from tabBar.
            ...(await getTabConfig(pageManifest.pageHeader, true, options)),
          };
        }
        delete pageManifest.pageHeader.source;
      }
      return pageManifest;
    }));
    // Delete manifest routes after transform.
    delete manifest.routes;
  }
  return transformManifestKeys(manifest, { isRoot: true });
}

export function getMultipleManifest(manifest: PHAManifest): Record<string, PHAManifest> {
  const multipleManifest = {};
  manifest.pages.forEach((page) => {
    let pageKey = page.key;
    // Generate manifest for each route.
    const copiedManifest = cloneDeep(manifest);
    // Reduce routes config by matched source.
    copiedManifest.pages = copiedManifest.pages.filter((copiedPage) => {
      if (page.frames && !pageKey) {
        // TODO: frames key may conflict with other page keys
        // https://github.com/raxjs/rax-app/blob/57a536723c8cc9ce7cd4892c1a5990854e395e2c/packages/plugin-rax-pha/src/plugins/AppToManifestPlugin.js#L110
        pageKey = page.frames[page.default_frame_index || 0].key;
        return pageKey === copiedPage.frames[copiedPage.default_frame_index || 0].key;
      } else {
        return pageKey === copiedPage.key;
      }
    });
    // take out the page data prefetch and assign it to the root node
    if (copiedManifest?.pages![0]?.data_prefetch) {
      copiedManifest.data_prefetch = copiedManifest.pages[0].data_prefetch;
      delete copiedManifest.pages[0].data_prefetch;
    }
    // take out the page preload and assign it to the root node
    if (copiedManifest?.pages![0]?.resource_prefetch) {
      copiedManifest.resource_prefetch = copiedManifest.pages[0].resource_prefetch;
      delete copiedManifest.pages[0].resource_prefetch;
    }
    multipleManifest[pageKey] = copiedManifest;
  });
  return multipleManifest;
}
