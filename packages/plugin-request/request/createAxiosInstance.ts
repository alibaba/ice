import axios from 'axios';

// https://github.com/axios/axios#request-config
const DEFAULE_CONFIG = {};

const axiosInstance = {
  default: axios.create(DEFAULE_CONFIG)
};

/**
 * 创建 Axios 实例
 * @param instanceName 实例名称
 */
function createAxiosInstance(instanceName?: string) {
  if (instanceName) {
    if (axiosInstance[instanceName]) {
      return axiosInstance;
    }
    axiosInstance[instanceName] = axios.create(DEFAULE_CONFIG);
  }
  return axiosInstance;
}

export default createAxiosInstance;
