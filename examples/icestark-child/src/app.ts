import { createApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container'
  },
  logger: {
    level: 'warn'
  },
  icestark: {
    type: 'child'
  },
};

createApp(appConfig);
