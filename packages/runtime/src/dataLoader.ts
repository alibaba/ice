import type { DataLoaderConfig, DataLoaderResult, RuntimeModules, AppExport, StaticRuntimePlugin, CommonJsRuntime, StaticDataLoader } from './types.js';
import getRequestContext from './requestContext.js';

interface Loaders {
  [routeId: string]: DataLoaderConfig;
}

interface CachedResult {
  value: any;
  status: string;
}

interface LoaderOptions {
  fetcher: Function;
  wrapper: Function;
  runtimeModules: RuntimeModules['statics'];
  appExport: AppExport;
}

export interface LoadRoutesDataOptions {
  ssg?: boolean;
  forceRequest?: boolean;
}

export function defineDataLoader(dataLoaderConfig: DataLoaderConfig): DataLoaderConfig {
  return dataLoaderConfig;
}

export function defineServerDataLoader(dataLoaderConfig: DataLoaderConfig): DataLoaderConfig {
  return dataLoaderConfig;
}

export function defineStaticDataLoader(dataLoaderConfig: DataLoaderConfig): DataLoaderConfig {
  return dataLoaderConfig;
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
 * Custom wrapper for deal with data loader.
 */
let dataLoaderWrapper;
export function setWrapper(customWrapper) {
  dataLoaderWrapper = customWrapper;
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
        strConfig = strConfig.replace(origin, getQueryParams()[value.substring(1)]);
      } else if (key === 'cookie') {
        // Replace cookie.
        strConfig = strConfig.replace(origin, getCookie()[value.substring(1)]);
      } else if (key === 'storage') {
        // Replace storage.
        strConfig = strConfig.replace(origin, localStorage.getItem(value.substring(1)));
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
export function callDataLoader(dataLoader: DataLoaderConfig, requestContext): DataLoaderResult {
  if (Array.isArray(dataLoader)) {
    const loaders = dataLoader.map((loader, index) => {
      return typeof loader === 'object' ? loadDataByCustomFetcher(loader) : dataLoaderWrapper(loader, index)(requestContext);
    });
    return Promise.all(loaders);
  }

  if (typeof dataLoader === 'object') {
    return loadDataByCustomFetcher(dataLoader);
  }

  return dataLoaderWrapper(dataLoader)(requestContext);
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
        status: 'RESOLVED',
      });

      if (renderMode === 'SSR') {
        return;
      }
    }

    const dataLoader = loaders[id];

    if (dataLoader) {
      const requestContext = getRequestContext(window.location);
      const loader = callDataLoader(dataLoader, requestContext);

      cache.set(id, {
        value: loader,
        status: 'LOADING',
      });
    }
  });
}

/**
 * Init data loader in client side.
 * Load initial data and register global loader.
 * In order to load data, JavaScript modules, CSS and other assets in parallel.
 */
async function init(dataloaderConfig: Loaders, options: LoaderOptions) {
  const {
    fetcher,
    wrapper,
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

  if (wrapper) {
    setWrapper(wrapper);
  }

  try {
    loadInitialDataInClient(dataloaderConfig);
  } catch (error) {
    console.error('Load initial data error: ', error);
  }

  (window as any).__ICE_DATA_LOADER__ = {
    getData: async (id, options: LoadRoutesDataOptions) => {
      let result;

      // first render for ssg use data from build time.
      // second render for ssg will use data from data loader.
      if (options?.ssg) {
        result = cache.get(`${id}_ssg`);
      } else {
        result = cache.get(id);
      }

      // Already send data request.
      if (result && !options?.forceRequest) {
        const { status, value } = result;

        if (status === 'RESOLVED') {
          return result;
        }

        try {
          if (Array.isArray(value)) {
            return await Promise.all(value);
          }

          return await value;
        } catch (error) {
          console.error('DataLoader: getData error.\n', error);

          return {
            message: 'DataLoader: getData error.',
            error,
          };
        }
      }

      const dataLoader = dataloaderConfig[id];

      // No data loader.
      if (!dataLoader) {
        return null;
      }

      // Call dataLoader.
      // In CSR, all dataLoader is called by global data loader to avoid bundle dataLoader in page bundle duplicate.
      const requestContext = getRequestContext(window.location);
      return await callDataLoader(dataLoader, requestContext);
    },
  };
}

export default {
  init,
};