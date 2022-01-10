import { runApp, IAppConfig } from 'ice';
import Test from './Test';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    renderComponent: Test,
  },
  // router: {}
};

runApp(appConfig);
