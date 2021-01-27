import { runApp, IAppConfig, config } from 'ice';

const appConfig: IAppConfig = {
  app: {
    getInitialData: async () => {
      // console.log('getInitialData ctx', ctx);

      // const res = await request('/user');
      // return res;
      return {
        data: {
          user: {
            name: 'Jack Ma',
            id: 10001,
          }
        },
      };
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

runApp(appConfig);
