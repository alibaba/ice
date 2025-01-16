import getRequestContext from './requestContext.js';
import type {
  RequestContext, RenderMode, AppExport,
  RuntimeModules, StaticRuntimePlugin, CommonJsRuntime,
  Loader, DataLoaderResult, StaticDataLoader, DataLoaderConfig, DataLoaderOptions,
} from './types.js';

interface Loaders {
  [routeId: string]: DataLoaderConfig;
}

interface CachedResult {
  value: any;
}

interface Options {
  fetcher: (config: StaticDataLoader) => Promise<any>;
  decorator: (dataLoader: Function, id?: number) => Function;
  runtimeModules: RuntimeModules['statics'];
  appExport: AppExport;
}

export interface LoadRoutesDataOptions {
  renderMode: RenderMode;
  requestContext?: RequestContext;
}

export function defineDataLoader(dataLoader: Loader, options?: DataLoaderOptions): DataLoaderConfig {
  return {
    loader: dataLoader,
    options,
  };
}

export function defineServerDataLoader(dataLoader: Loader, options?: DataLoaderOptions): DataLoaderConfig {
  return {
    loader: dataLoader,
    options,
  };
}

export function defineStaticDataLoader(dataLoader: Loader): DataLoaderConfig {
  return {
    loader: dataLoader,
  };
}

/**
 * Custom fetcher for load static data loader config.
 * Set globally to avoid passing this fetcher too deep.
 */
let dataLoaderFetcher: (config: StaticDataLoader) => Promise<any>;
export function setFetcher(customFetcher: (config: StaticDataLoader) => Promise<any>): void {
  dataLoaderFetcher = customFetcher;
}

/**
 * Custom decorator for deal with data loader.
 */
let dataLoaderDecorator = (dataLoader: Function, id?: number): Function => {
  return dataLoader;
};
export function setDecorator(customDecorator: (dataLoader: Function, id?: number) => Function): void {
  dataLoaderDecorator = customDecorator;
}

/**
 * Parse template for static dataLoader.
 */
export function parseTemplate(config: StaticDataLoader): StaticDataLoader {
  const queryParams: Record<string, string> = {};
  const getQueryParams = (): Record<string, string> => {
    if (Object.keys(queryParams).length === 0 && location.search.includes('?')) {
      location.search.substring(1).split('&').forEach(query => {
        const [key, value] = query.split('=');
        if (key && value) {
          queryParams[key] = value;
        }
      });
    }
    return queryParams;
  };

  const cookie: Record<string, string> = {};
  const getCookie = (): Record<string, string> => {
    if (Object.keys(cookie).length === 0) {
      document.cookie.split(';').forEach(c => {
        const [key, value] = c.split('=');
        if (key && value) {
          cookie[key.trim()] = value.trim();
        }
      });
    }
    return cookie;
  };

  let strConfig = JSON.stringify(config) || '';
  const regexp = /\$\{(queryParams|cookie|storage)(\.(\w|-)+)?}/g;
  const matches = Array.from(strConfig.matchAll(regexp));

  matches.forEach(([origin, key, value]) => {
    if (origin && key && value?.startsWith('.')) {
      const param = value.substring(1);
      if (key === 'queryParams') {
        strConfig = strConfig.replace(origin, getQueryParams()[param] || '');
      } else if (key === 'cookie') {
        strConfig = strConfig.replace(origin, getCookie()[param] || '');
      } else if (key === 'storage') {
        strConfig = strConfig.replace(origin, localStorage.getItem(param) || '');
      }
    }
  });

  strConfig = strConfig.replace('${url}', location.href);

  return JSON.parse(strConfig);
}

export function loadDataByCustomFetcher(config: StaticDataLoader): Promise<any> {
  let parsedConfig = config;
  try {
    if (import.meta.renderer === 'client') {
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
    return dataLoader.map((loader, index) =>
      (typeof loader === 'object' ? loadDataByCustomFetcher(loader) : dataLoaderDecorator(loader, index)(requestContext)),
    );
  }

  if (typeof dataLoader === 'object') {
    return loadDataByCustomFetcher(dataLoader);
  }

  return dataLoaderDecorator(dataLoader)(requestContext);
}

const cache = new Map<string, CachedResult>();

/**
 * Start getData once data-loader.js is ready in client, and set to cache.
 */
function loadInitialDataInClient(loaders: Loaders): void {
  const context = (window as any).__ICE_APP_CONTEXT__ || {};
  const matchedIds = context.matchedIds || [];
  const loaderData = context.loaderData || {};
  const { renderMode } = context;

  const ids = ['__app', ...matchedIds];
  ids.forEach(id => {
    const dataFromSSR = loaderData[id]?.data;
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
      const { loader } = dataLoaderConfig;
      const promise = callDataLoader(loader, requestContext);

      cache.set(id, {
        value: promise,
      });
    }
  });
}

/**
 * Init data loader in client side.
 */
async function init(loaders: Loaders, options: Options): Promise<void> {
  const { fetcher, decorator, runtimeModules, appExport } = options;

  const runtimeApi = {
    appContext: { appExport },
  };

  if (runtimeModules) {
    await Promise.all(
      runtimeModules
        .map(module => {
          const runtimeModule = ((module as CommonJsRuntime).default || module) as StaticRuntimePlugin;
          return runtimeModule(runtimeApi);
        })
        .filter(Boolean),
    );
  }

  if (fetcher) setFetcher(fetcher);
  if (decorator) setDecorator(decorator);

  try {
    loadInitialDataInClient(loaders);
  } catch (error) {
    console.error('Load initial data error: ', error);
  }

  (window as any).__ICE_DATA_LOADER__ = {
    getLoader: (id: string): DataLoaderConfig => loaders[id],
    getData: (id: string, options: LoadRoutesDataOptions): DataLoaderResult => {
      const cacheKey = `${id}${options?.renderMode === 'SSG' ? '_ssg' : ''}`;
      const result = cache.get(cacheKey);
      cache.delete(cacheKey);

      if (result) return result.value;

      const dataLoaderConfig = loaders[id];
      if (!dataLoaderConfig) return null;

      const { loader } = dataLoaderConfig;
      return callDataLoader(loader, options?.requestContext || getRequestContext(window.location));
    },
  };
}

export const dataLoader = {
  init,
};

export default dataLoader;
