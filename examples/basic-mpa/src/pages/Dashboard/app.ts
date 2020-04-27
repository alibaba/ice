import { createApp, IAppConfig } from 'ice';
import routes from './routes';

const appConfig: IAppConfig = {
  router: {
    routes
  },
};

createApp(appConfig);
