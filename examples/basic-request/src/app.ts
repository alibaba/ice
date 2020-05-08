import { createApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
  request: {
    returnResponse: false,
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
