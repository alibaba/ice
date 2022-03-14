import { runApp, IAppConfig } from 'ice';
import Index from './index';

const appConfig: IAppConfig = {
  router: {
    type: 'hash',
    routes: [{ path: '/', component: Index }],
  },
};

runApp(appConfig);
