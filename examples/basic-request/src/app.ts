import { createApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
  request: {
    // 可选的，全局设置 request 是否返回 response 对象，默认为 false
    // withFullResponse: true,
    baseURL: '/api',
    interceptors: {
      response: {
        // 可选的
        onConfig: (config) => {
          return config;
        },
        // 可选的
        onError: (error) => {
          return Promise.reject(error);
        }
      },
    }
  }
};

createApp(appConfig);
