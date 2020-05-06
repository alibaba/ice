import { createApp, IAppConfig, history } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
  request: {
    returnResponse: true,
    baseURL: '/api',
    interceptors: {
      response: {
        // 可选的
        onConfig: (config) => {
          console.log({history});
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
