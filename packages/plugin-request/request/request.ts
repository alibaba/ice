import { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as utils from 'axios/lib/utils';
import axiosInstance from './axiosInstance';

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

const request = async function (options) {
  try {
    const response = await axiosInstance(options);
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
