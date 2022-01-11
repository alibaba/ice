import { runApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    errorBoundary: true,
  },
  router: {
    type: 'browser',
  },
};

runApp(appConfig);
