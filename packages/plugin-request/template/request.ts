import { AxiosRequestConfig } from 'axios';
import * as utils from 'axios/lib/utils';
import createAxiosInstance from './createAxiosInstance';

export interface IRequestProps {
  get: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  delete: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  head: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  options: <T = any>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
  put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
  patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<T>;
}

interface IRequest extends IRequestProps {
  <T = any>(options: AxiosRequestConfig): Promise<T>;
  <T = any>(url: string, config?: AxiosRequestConfig): Promise<T>;
}

/**
 * 请求体，返回 response.data | response
 * @param options 请求配置 https://github.com/axios/axios#request-config
 */
const request = async function <T = any>(options): Promise<T> {
  try {
    const instanceName = options.instanceName ? options.instanceName : 'default';
    const axiosInstance = createAxiosInstance()[instanceName];
    if (!(typeof axiosInstance === 'function')) {
      throw new Error(`unknown ${instanceName} in request method`);
    }
    const response = await axiosInstance(options);
    // @ts-ignore
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
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  request[method] = function <T = any>(url, config) {
    return request<T>(utils.merge(config || {}, {
      method,
      url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  request[method] = function <T = any>(url, data, config) {
    return request<T>(utils.merge(config || {}, {
      method,
      url,
      data
    }));
  };
});

export default request as IRequest;
