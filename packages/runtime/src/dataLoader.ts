import type { DataLoaderConfig, RuntimeModules, AppExport, RuntimePlugin, CommonJsRuntime } from './types.js';
import getRequestContext from './requestContext.js';
import { setFetcher, loadDataByCustomFetcher } from './dataLoaderFetcher.js';

interface Loaders {
  [routeId: string]: DataLoaderConfig;
}

interface Result {
  value: any;
  status: string;
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

const cache = new Map<string, Result>();

/**
 * Start getData once loader is ready, and set to cache.
 */
function loadInitialData(loaders: Loaders) {
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

      let loader;

      if (Array.isArray(dataLoader)) {
        loader = dataLoader.map(loader => {
          if (typeof loader === 'object') {
            return loadDataByCustomFetcher(loader);
          }

          return loader(requestContext);
        });
      } else if (typeof dataLoader === 'object') {
        return loadDataByCustomFetcher(loader);
      } else {
        loader = dataLoader(requestContext);
      }

      cache.set(id, {
        value: loader,
        status: 'LOADING',
      });
    }
  });
}

interface Options {
  fetcher: Function;
  runtimeModules: RuntimeModules['statics'];
  appExport: AppExport;
}

/**
 * Load initial data and register global loader.
 * In order to load data, JavaScript modules, CSS and other assets in parallel.
 */
async function init(loadersConfig: Loaders, options: Options) {
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
    loadInitialData(loadersConfig);
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