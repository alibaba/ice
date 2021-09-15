import type { AxiosInstance } from 'axios';
// @ts-ignore
import axios from '$$locked/axios';

// https://github.com/axios/axios#request-config
const DEFAULT_CONFIG = {};

const axiosInstance = {
  default: axios.create(DEFAULT_CONFIG)
};

/**
 * 创建 Axios 实例
 * @param instanceName 实例名称
 */
function createAxiosInstance(instanceName?: string): { default: AxiosInstance} {
  if (instanceName) {
    if (axiosInstance[instanceName]) {
      return axiosInstance;
    }
    axiosInstance[instanceName] = axios.create(DEFAULT_CONFIG);
  }
  return axiosInstance;
}

export default createAxiosInstance;
