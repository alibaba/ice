import type { GetData, GetDataConfig } from './types.js';
import getRequestContext from './requestContext.js';

interface Loaders {
  [routeId: string]: GetData;
}

interface LoadersConfig {
  [routeId: string]: GetDataConfig;
}

interface Result {
  value: any;
  status: string;
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

    const getData = loaders[id];

    if (getData) {
      const requestContext = getRequestContext(window.location);

      const loader = getData(requestContext).then(data => {
        cache.set(id, {
          value: data,
          status: 'RESOLVED',
        });
        return data;
      }).catch(err => {
        cache.set(id, {
          value: err,
          status: 'REJECTED',
        });
      });

      cache.set(id, {
        value: loader,
        status: 'PENDING',
      });
    }
  });
}

/**
 * getData from cache or run it.
 */
async function load(id: string, loader: GetData) {
  if (!loader) {
    return null;
  }

  const result = cache.get(id);

  // get from cache first
  if (result) {
    const { value, status } = result;

    if (status === 'RESOLVED') {
      return value;
    }

    if (status === 'REJECTED') {
      throw value;
    }

    // PENDING
    return await value;
  } else {
    // if no cache, call the loader
    const requestContext = getRequestContext(window.location);
    return await loader(requestContext);
  }
}

/**
 * Get loaders by config of loaders.
 */
function getLoaders(loadersConfig: LoadersConfig, fetcher: Function): Loaders {
  const loaders: Loaders = {};

  Object.keys(loadersConfig).forEach(id => {
    const loader = loadersConfig[id];

    // If getData is an object, it is wrapped with a function.
    loaders[id] = typeof loader === 'function' ? loader : () => {
      return fetcher(loader);
    };
  });

  return loaders;
}

/**
 * Load initial data and register global loader.
 * In order to load data, JavaScript modules, CSS and other assets in parallel.
 */
function init(loadersConfig: LoadersConfig, fetcher: Function) {
  const loaders = getLoaders(loadersConfig, fetcher);

  try {
    loadInitialData(loaders);
  } catch (error) {
    console.error('Load initial data error: ', error);
  }

  (window as any).__ICE_DATA_LOADER__ = async (id) => {
    const loader = loaders[id];
    return await load(id, loader);
  };
}

export default {
  init,
};
