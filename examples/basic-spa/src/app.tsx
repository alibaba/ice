import React from 'react';
import { runApp, APP_MODE, IAppConfig, logger, history, getHistory } from 'ice';

console.log('APP_MODE', APP_MODE);
logger.info('APP_MODE', APP_MODE);
console.log(process.env.ICE_ROOT);
logger.debug('test');

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    errorBoundary: true,
    parseSearchParams: true,
    // renderComponent: () => <>HELLO</>,
    getInitialData: async() => {
      // const result = await request('/repo');
      const result = {
        status: 'SUCCESS',
        data: {
          group: 'ice.js',
          url: 'http://github.com/ice-lab/ice.js',
        }
      };
      return result;
    },
    onShow() {
      console.log('getHistory ==>', getHistory());
      console.log('history ==>', history);
      console.log('app show...');
    },
    onHide() {
      console.log('app hide...');
    },
  },
  router: {
    basename: '/ice',
    type: 'hash',
    fallback: <div>加载中...</div>,
    // routes: [{path: '/home', component: () => <>He</>}]
  },
  request: {
    timeout: 5000,
    baseURL: '/api',
    interceptors: {
      request: {
        onConfig: (config) => {
          return config;
        }
      }
    }
  }
};

runApp(appConfig);

console.error('error log after runApp');
