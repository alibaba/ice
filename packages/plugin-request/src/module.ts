import axiosInstance from '$ice/axiosInstance';

const module = ({ appConfig }) => {
  if (appConfig.request) {
    const { request = {} } = appConfig;
    const { interceptors = {}, ...requestOptions } = request;

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
};

export default module;
