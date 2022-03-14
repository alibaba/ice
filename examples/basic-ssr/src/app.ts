import { runApp, IAppConfig, config } from 'ice';

const delay = (time) =>
  new Promise<void>((resolve) => setTimeout(() => resolve(), time));

const appConfig: IAppConfig = {
  app: {
    rootId: 'root',
    getInitialData: async () => {
      // console.log('getInitialData ctx', ctx);

      // const res = await request('/user');
      // return res;
      await delay(1500);
      return {
        initialStates: {
          user: {
            name: 'Jack Ma',
            id: 10001,
          },
        },
      };
    },
  },
  router: {
    type: 'browser',
  },
  request: {
    baseURL: config.baseURL
  }
};

runApp(appConfig);
