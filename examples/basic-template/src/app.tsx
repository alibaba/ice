import { runApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    errorBoundary: true,
    parseSearchParams: true,
    onShow() {
      console.log('app show...');
    },
    onHide() {
      console.log('app hide...');
    },
  },
};

runApp(appConfig);
