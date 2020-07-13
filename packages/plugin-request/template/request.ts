import { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as utils from 'axios/lib/utils';
import createAxiosInstance from './createAxiosInstance';

export interface IRequestProps {
  get: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
  delete: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
  head: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
  options: (url: string, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
  post: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
  put: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
  patch: (url: string, data?: any, config?: AxiosRequestConfig) => Promise<AxiosResponse<any>>;
}

interface IRequest extends IRequestProps {
  (options: AxiosRequestConfig): any;
  (url: string, config?: AxiosRequestConfig): any;
}

/**
 * 请求体，返回 response.data | response
 * @param options 请求配置 https://github.com/axios/axios#request-config
 */
const request = async function (options) {
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
  request[method] = function(url, config) {
    return request(utils.merge(config || {}, {
      method,
      url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  request[method] = function(url, data, config) {
    return request(utils.merge(config || {}, {
      method,
      url,
      data
    }));
  };
});

export default request as IRequest;
