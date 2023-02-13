import type { AxiosRequestConfig, CancelTokenStatic, CancelStatic } from 'axios';
import axios from 'axios';

// https://github.com/axios/axios#request-config
const DEFAULT_CONFIG = {};

const axiosInstances = {
  default: axios.create(DEFAULT_CONFIG),
};

/**
 * Create an axios instance.
 * @param instanceName
 */
export function createAxiosInstance(instanceName?: string) {
  if (instanceName) {
    if (axiosInstances[instanceName]) {
      return axiosInstances;
    }
    axiosInstances[instanceName] = axios.create(DEFAULT_CONFIG);
  }
  return axiosInstances;
}

export function setAxiosInstance(requestConfig, axiosInstance) {
  const { interceptors = {}, ...requestOptions } = requestConfig;
  Object.keys(requestOptions).forEach(key => {
    axiosInstance.defaults[key] = requestOptions[key];
  });

  function isExist(handlers, [fulfilled, rejected]) {
    return handlers.some(item => item.fulfilled === fulfilled && item.rejected === rejected);
  }

  // Add request interceptor.
  if (interceptors.request) {
    const [fulfilled, rejected] = [
      interceptors.request.onConfig || function (config) { return config; },
      interceptors.request.onError || function (error) { return Promise.reject(error); },
    ];
    if (isExist(axiosInstance.interceptors.request.handlers, [fulfilled, rejected])) return;
    axiosInstance.interceptors.request.use(fulfilled, rejected);
  }

  // Add response interceptor.
  if (interceptors.response) {
    const [fulfilled, rejected] = [
      interceptors.response.onConfig || function (response) { return response; },
      interceptors.response.onError || function (error) { return Promise.reject(error); },
    ];
    if (isExist(axiosInstance.interceptors.response.handlers, [fulfilled, rejected])) return;
    axiosInstance.interceptors.response.use(fulfilled, rejected);
  }
}

interface RequestConfig<D> extends AxiosRequestConfig<D> {
  instanceName?: string;
  withFullResponse?: boolean;
}

export interface RequestProps<T = any, D = any> {
  get: (url: string, config?: RequestConfig<D>) => Promise<T>;
  delete: (url: string, config?: RequestConfig<D>) => Promise<T>;
  head: (url: string, config?: RequestConfig<D>) => Promise<T>;
  options: (url: string, config?: RequestConfig<D>) => Promise<T>;
  post: (url: string, data?: D, config?: RequestConfig<D>) => Promise<T>;
  put: (url: string, data?: D, config?: RequestConfig<D>) => Promise<T>;
  patch: (url: string, data?: D, config?: RequestConfig<D>) => Promise<T>;
}

interface Request<T, D> extends RequestProps<T, D> {
  (options: RequestConfig<D>): Promise<T>;
  (url: string, config?: RequestConfig<D>): Promise<T>;
  Cancel: CancelStatic;
  CancelToken: CancelTokenStatic;
  isCancel: (value: any) => boolean;
}

/**
 * Request, return response.data | response
 * @param options Reference: https://github.com/axios/axios#request-config
 */
const request = async function <T, D>(options: RequestConfig<D>): Promise<T> {
  try {
    const instanceName = options.instanceName ? options.instanceName : 'default';
    const axiosInstance = createAxiosInstance()[instanceName];
    if (!(typeof axiosInstance === 'function')) {
      throw new Error(`unknown ${instanceName} in request method`);
    }
    const response = await axiosInstance(options);
    if (axiosInstance.defaults.withFullResponse || options.withFullResponse) {
      return response;
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Provide aliases for supported request methods
['delete', 'get', 'head', 'options'].forEach((method) => {
  request[method] = function <T = any, D = any>(url, config) {
    return request<T, D>(Object.assign(config || {}, {
      method,
      url,
    }));
  };
});

['post', 'put', 'patch'].forEach((method) => {
  request[method] = function <T = any, D = any>(url, data, config) {
    return request<T, D>(Object.assign(config || {}, {
      method,
      url,
      data,
    }));
  };
});

request.CancelToken = axios.CancelToken;
request.isCancel = axios.isCancel;

export { request };
