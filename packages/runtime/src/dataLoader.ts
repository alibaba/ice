import type { RequestContext, RenderMode, Loader, DataLoaderResult, RuntimeModules, AppExport, StaticRuntimePlugin, CommonJsRuntime, StaticDataLoader } from './types.js';
import getRequestContext from './requestContext.js';

interface Loaders {
  [routeId: string]: DataLoaderConfig;
}

interface CachedResult {
  value: any;
}

interface LoaderOptions {
  fetcher: Function;
  runtimeModules: RuntimeModules['statics'];
  appExport: AppExport;
}

interface Options {
  defer?: boolean;
}

type DataLoaderConfig = [Loader, Options?];

export interface LoadRoutesDataOptions {
  renderMode: RenderMode;
}

export function defineDataLoader(dataLoader: Loader, options?: Options): DataLoaderConfig {
  return [dataLoader, options];
}

export function defineServerDataLoader(dataLoader: Loader, options?: Options): DataLoaderConfig {
  return [dataLoader, options];
}

export function defineStaticDataLoader(dataLoader: Loader): DataLoaderConfig {
  return [dataLoader];
}

/**
 * Custom fetcher for load static data loader config.
 * Set globally to avoid passing this fetcher too deep.
 */
let dataLoaderFetcher;

export function setFetcher(customFetcher) {
  dataLoaderFetcher = customFetcher;
}

/**
 * Parse template for static dataLoader.
 */
export function parseTemplate(config: StaticDataLoader) {
  const queryParams = {};
  const getQueryParams = () => {
    if (Object.keys(queryParams).length === 0) {
      if (location.search.includes('?')) {
        location.search.substring(1).split('&').forEach(query => {
          const res = query.split('=');
          // ?test=1&hello=world
          if (res[0] !== undefined && res[1] !== undefined) {
            queryParams[res[0]] = res[1];
          }
        });
      }
    }

    return queryParams;
  };

  const cookie = {};
  const getCookie = () => {
    if (Object.keys(cookie).length === 0) {
      document.cookie.split(';').forEach(c => {
        const [key, value] = c.split('=');
        if (key !== undefined && value !== undefined) {
          cookie[key.trim()] = value.trim();
        }
      });
    }

    return cookie;
  };

  // Match all template of query cookie and storage.
  let strConfig = JSON.stringify(config) || '';
  const regexp = /\$\{(queryParams|cookie|storage)(\.(\w|-)+)?}/g;
  let cap = [];
  let matched = [];
  while ((cap = regexp.exec(strConfig)) !== null) {
    matched.push(cap);
  }

  matched.forEach(item => {
    const [origin, key, value] = item;
    if (item && origin && key && value && value.startsWith('.')) {
      if (key === 'queryParams') {
        // Replace query params.
        strConfig = strConfig.replace(origin, getQueryParams()[value.substring(1)] || '');
      } else if (key === 'cookie') {
        // Replace cookie.
        strConfig = strConfig.replace(origin, getCookie()[value.substring(1)] || '');
      } else if (key === 'storage') {
        // Replace storage.
        strConfig = strConfig.replace(origin, localStorage.getItem(value.substring(1)) || '');
      }
    }
  });

  // Replace url.
  strConfig = strConfig.replace('${url}', location.href);

  return JSON.parse(strConfig);
}

export function loadDataByCustomFetcher(config: StaticDataLoader) {
  let parsedConfig = config;
  try {
    // Not parse template in SSG/SSR.
    if (typeof window !== 'undefined') {
      parsedConfig = parseTemplate(config);
    }
  } catch (error) {
    console.error('parse template error: ', error);
  }
  return dataLoaderFetcher(parsedConfig);
}

/**
 * Handle for different dataLoader.
 */
export function callDataLoader(dataLoader: Loader, requestContext: RequestContext): DataLoaderResult {
  if (Array.isArray(dataLoader)) {
    const loaders = dataLoader.map(loader => {
      return typeof loader === 'object' ? loadDataByCustomFetcher(loader) : loader(requestContext);
    });

    return loaders;
  }

  if (typeof dataLoader === 'object') {
    return loadDataByCustomFetcher(dataLoader);
  }

  return dataLoader(requestContext);
}

const cache = new Map<string, CachedResult>();

/**
 * Start getData once data-loader.js is ready in client, and set to cache.
 */
function loadInitialDataInClient(loaders: Loaders) {
  const context = (window as any).__ICE_APP_CONTEXT__ || {};
  const matchedIds = context.matchedIds || [];
  const routesData = context.routesData || {};
  const { renderMode } = context;

  const ids = ['_app'].concat(matchedIds);
  ids.forEach(id => {
    const dataFromSSR = routesData[id];
    if (dataFromSSR) {
      cache.set(renderMode === 'SSG' ? `${id}_ssg` : id, {
        value: dataFromSSR,
      });

      if (renderMode === 'SSR') {
        return;
      }
    }

    const dataLoaderConfig = loaders[id];

    if (dataLoaderConfig) {
      const requestContext = getRequestContext(window.location);
      const [dataLoader] = dataLoaderConfig;
      const promise = callDataLoader(dataLoader, requestContext);

      cache.set(id, {
        value: promise,
      });
    }
  });
}

/**
 * Init data loader in client side.
 * Load initial data and register global loader.
 * In order to load data, JavaScript modules, CSS and other assets in parallel.
 */
async function init(loaders: Loaders, options: LoaderOptions) {
  const {
    fetcher,
    runtimeModules,
    appExport,
  } = options;

  const runtimeApi = {
    appContext: {
      appExport,
    },
  };

  if (runtimeModules) {
    await Promise.all(runtimeModules.map(module => {
      const runtimeModule = ((module as CommonJsRuntime).default || module) as StaticRuntimePlugin;
      return runtimeModule(runtimeApi);
    }).filter(Boolean));
  }

  if (fetcher) {
    setFetcher(fetcher);
  }

  try {
    loadInitialDataInClient(loaders);
  } catch (error) {
    console.error('Load initial data error: ', error);
  }

  (window as any).__ICE_DATA_LOADER__ = {
    getData: (id, options: LoadRoutesDataOptions) => {
      let result;

      // First render for ssg use data from build time, second render for ssg will use data from data loader.
      const cacheKey = `${id}${options?.renderMode === 'SSG' ? '_ssg' : ''}`;

      // In CSR, all dataLoader is called by global data loader to avoid bundle dataLoader in page bundle duplicate.
      result = cache.get(cacheKey);
      // Always fetch new data after cache is been used.
      cache.delete(cacheKey);

      // Already send data request.
      if (result) {
        return result.value;
      }

      const dataLoaderConfig = loaders[id];

      // No data loader.
      if (!dataLoaderConfig) {
        return null;
      }

      // Call dataLoader.
      const requestContext = getRequestContext(window.location);
      const [loader] = dataLoaderConfig;
      return callDataLoader(loader, requestContext);
    },
  };
}

export default {
  init,
};
