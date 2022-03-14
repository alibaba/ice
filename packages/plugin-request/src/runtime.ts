// @ts-ignore
import createAxiosInstance from '$ice/createAxiosInstance';

const module = ({ appConfig }) => {
  if (appConfig.request) {
    const { request: requestConfig = {} } = appConfig;
    // 支持配置多实例
    if (Object.prototype.toString.call(requestConfig) === '[object Array]') {
      requestConfig.forEach(requestItem => {
        const instanceName = requestItem.instanceName ? requestItem.instanceName : 'default';
        if (instanceName) {
          const axiosInstance = createAxiosInstance(instanceName)[instanceName];
          setAxiosInstance(requestItem, axiosInstance);
        }
      });
    } else {
      // 配置单一实例
      const axiosInstance = createAxiosInstance().default;
      setAxiosInstance(requestConfig, axiosInstance);
    }
  }
};

/**
 * 将 appConfig 的 request 配置项通过 axiosInstance.default 进行设置
 * @param requestConfig 配置项
 * @param axiosInstance 实例对象
 */
function setAxiosInstance(requestConfig, axiosInstance) {
  const { interceptors = {}, ...requestOptions } = requestConfig;
  Object.keys(requestOptions).forEach(key => {
    axiosInstance.defaults[key] = requestOptions[key];
  });

  // Add a request interceptor
  if (interceptors.request) {
    axiosInstance.interceptors.request.use(
      interceptors.request.onConfig || function(config){ return config; },
      interceptors.request.onError || function(error) { return Promise.reject(error); }
    );
  }

  // Add a response interceptor
  if (interceptors.response) {
    axiosInstance.interceptors.response.use(
      interceptors.response.onConfig || function(response){ return response; },
      interceptors.response.onError || function(error){ return Promise.reject(error); }
    );
  }
}

export default module;
