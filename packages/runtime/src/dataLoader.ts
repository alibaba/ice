import type { DataLoaderConfig, DataLoaderResult, RuntimeModules, AppExport, RuntimePlugin, CommonJsRuntime } from './types.js';
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

export function loadDataByCustomFetcher(config) {
  return dataLoaderFetcher(config);
}

/**
 * Handle for different dataLoader.
 */
export function callDataLoader(dataLoader: DataLoaderConfig, requestContext): DataLoaderResult {
  if (Array.isArray(dataLoader)) {
    return dataLoader.map(loader => {
      return typeof loader === 'object' ? loadDataByCustomFetcher(loader) : loader(requestContext);
    });
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

  matchedIds.forEach(id => {
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
async function init(loadersConfig: Loaders, options: LoaderOptions) {
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
      const runtimeModule = (module as CommonJsRuntime).default || module as RuntimePlugin;
      return runtimeModule(runtimeApi);
    }).filter(Boolean));
  }

  if (fetcher) {
    setFetcher(fetcher);
  }

  try {
    loadInitialDataInClient(loadersConfig);
  } catch (error) {
    console.error('Load initial data error: ', error);
  }

  (window as any).__ICE_DATA_LOADER__ = {
    hasLoad: (id) => {
      return cache.get(id);
    },
    getData: async (id) => {
      const result = cache.get(id);

      if (!result) {
        return null;
      }

      const { status, value } = result;

      if (status === 'RESOLVED') {
        return result;
      }

      if (Array.isArray(value)) {
        return await Promise.all(value);
      }

      return await value;
    },
  };
}

export default {
  init,
};