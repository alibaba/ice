import { createApp, IAppConfig, config, request } from 'ice';

const appConfig: IAppConfig = {
  app: {
    getInitialData: async () => {
      const res = await request('/user');
      return res;
    }
  },
  router: {
    type: 'browser'
  },
  request: {
    baseURL: config.baseURL
  },
  store: {
    getInitialStates: (initialData) => {
      return initialData.data;
    }
  }
};

createApp(appConfig);
