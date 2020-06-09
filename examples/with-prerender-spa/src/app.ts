import { createApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container'
  },
  router: {
    type: 'browser',
  }
};

createApp(appConfig);
