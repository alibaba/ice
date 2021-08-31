import { runApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container'
  },
  router: {
    // not support hash
    type: 'browser',
  }
};

runApp(appConfig);
