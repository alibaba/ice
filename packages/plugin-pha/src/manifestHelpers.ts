import * as path from 'path';
import { decamelize } from 'humps';
import { retainKeys, camelizeKeys } from './constants.js';

interface Options {
  isRoot?: boolean;
  parentKey?: string;
  // TODO specify routes type
  routes?: Record<string, any>[];
}

export function parseManifest(manifest: Record<string, any>, options?: Options) {
  const { routes, parentKey, isRoot } = options;
  const data = {};

  if (isRoot && routes) {
    manifest.pages = routes;
  }
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
          return parseManifest(item, { isRoot: false, parentKey: key });
        }
        return item;
      });
    } else if (key === 'requestHeaders') {
      // keys of requestHeaders should not be transformed
      data[transformKey] = value;
    } else if (typeof value === 'object' && !(parentKey === 'dataPrefetch' && (key === 'header' || key === 'data'))) {
      data[transformKey] = parseManifest(value, { isRoot: false, parentKey: key });
    } else {
      data[transformKey] = value;
    }
  }
  return data;
}

