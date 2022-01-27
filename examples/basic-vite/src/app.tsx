import type { IAppConfig } from 'ice';
import { runApp } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    errorBoundary: true,
  },
};

runApp(appConfig);
