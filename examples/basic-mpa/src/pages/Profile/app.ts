import { runApp, IAppConfig } from 'ice';
import Page from './index';

const appConfig: IAppConfig = {
  app: {
    rootId: 'custom-container',
    // renderComponent: Page,
  },
};

runApp(appConfig);
