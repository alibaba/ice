import type { RuntimePlugin } from '@ice/runtime/esm/types';
import { createAxiosInstance, setAxiosInstance } from './request.js';
import type { RequestConfig } from './types';

const EXPORT_NAME = 'requestConfig';

const runtime: RuntimePlugin = async ({ appContext }) => {
  const { appExport } = appContext;
  const exported = appExport[EXPORT_NAME];
  const requestConfig: RequestConfig = (typeof exported === 'function' ? await exported() : exported) || {};

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
