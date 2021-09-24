import 'moment/dist/locale/zh-cn';
import { runApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container'
  }
};

runApp(appConfig);
