import { createApp, IAppConfig, history } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
  request: {
    baseURL: '/api',
    interceptors: {
      response: {
        onConfig: (config) => {
          console.log({history});
          return config;
        },
      },
    }
  }
};

createApp(appConfig);
