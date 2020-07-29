import axios from 'axios';
import mpAdapter from 'axios-miniprogram-adapter';
import { isMiniApp, isWeChatMiniProgram, isByteDanceMicroApp } from 'universal-env';

// https://github.com/axios/axios#request-config
let DEFAULE_CONFIG = {};

if (isMiniApp || isWeChatMiniProgram || isByteDanceMicroApp) {
  DEFAULE_CONFIG = Object.assign({}, DEFAULE_CONFIG, { adapter: mpAdapter });
}

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
