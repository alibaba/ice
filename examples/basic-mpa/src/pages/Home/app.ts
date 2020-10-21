import { runApp, IAppConfig } from 'ice';
import Home from './index';

const appConfig: IAppConfig = {
  router: {
    routes: [{ path: '/', component: Home }],
  },
};

runApp(appConfig);
