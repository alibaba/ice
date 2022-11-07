import type { RuntimePlugin } from '@ice/runtime/esm/types';
import { createAxiosInstance, setAxiosInstance } from './request.js';
import type { RequestConfig } from './types';

const runtime: RuntimePlugin = async ({ appContext }) => {
  const { appExport } = appContext;
  const requestConfig: RequestConfig = (typeof appExport.request === 'function' ? await appExport.request() : appExport.request) || {};

  // Support multi configs.
  if (Array.isArray(requestConfig)) {
    requestConfig.forEach(requestItem => {
      const instanceName = requestItem.instanceName ? requestItem.instanceName : 'default';
      if (instanceName) {
        const axiosInstance = createAxiosInstance(instanceName)[instanceName];
        setAxiosInstance(requestItem, axiosInstance);
      }
    });
  } else {
    const axiosInstance = createAxiosInstance().default;
    setAxiosInstance(requestConfig, axiosInstance);
  }
};

export default runtime;
