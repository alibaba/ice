import { createApp, IAppConfig } from 'ice';
import Dashboard from './index';

const appConfig: IAppConfig = {
  router: {
    routes: [{ path: '/', component: Dashboard }],
  },
};

createApp(appConfig);
