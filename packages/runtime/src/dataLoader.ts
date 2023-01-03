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
  runtimeModules: RuntimeModules['statics'];
  appExport: AppExport;
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
 * Parse template for static dataLoader.
 */
export function parseTemplate(config: StaticDataLoader) {
  // Not parse template in SSG/SSR.
  if (typeof window === 'undefined') return config;

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
        const res = c.split('=');
        if (res[0] !== undefined && res[1] !== undefined) {
          cookie[res[0].trim()] = res[1].trim();
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
    if (item && item[0] && item[1] && item[2].startsWith('.') && item[2]) {
      if (item[1] === 'queryParams') {
        // Replace query params.
        strConfig = strConfig.replace(item[0], getQueryParams()[item[2].substring(1)]);
      } else if (item[1] === 'cookie') {
        // Replace cookie.
        strConfig = strConfig.replace(item[0], getCookie()[item[2].substring(1)]);
      } else if (item[1] === 'storage') {
        // Replace storage.
        strConfig = strConfig.replace(item[0], localStorage.getItem(item[2].substring(1)));
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
    parsedConfig = parseTemplate(config);
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
    const loaders = dataLoader.map(loader => {
      return typeof loader === 'object' ? loadDataByCustomFetcher(loader) : loader(requestContext);
    });
    return Promise.all(loaders);
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

  const ids = ['_app'].concat(matchedIds);
  ids.forEach(id => {
    const dataFromSSR = routesData[id];
    if (dataFromSSR) {
      cache.set(id, {
        value: dataFromSSR,
        status: 'RESOLVED',
      });

      return dataFromSSR;
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
    loadInitialDataInClient(dataloaderConfig);
  } catch (error) {
    console.error('Load initial data error: ', error);
  }

  (window as any).__ICE_DATA_LOADER__ = {
    getData: async (id) => {
      const result = cache.get(id);

      // Already send data request.
      if (result) {
        const { status, value } = result;

        if (status === 'RESOLVED') {
          return result;
        }

        if (Array.isArray(value)) {
          return await Promise.all(value);
        }

        return await value;
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