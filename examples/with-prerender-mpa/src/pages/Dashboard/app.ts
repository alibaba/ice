import { runApp, IAppConfig } from 'ice';
import routes from './routes';

const appConfig: IAppConfig = {
  router: {
    routes
  },
};

runApp(appConfig);
