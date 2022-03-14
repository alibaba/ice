import { runApp, IAppConfig } from 'ice';
import Main from './index';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    renderComponent: Main,
  },
};

runApp(appConfig);
