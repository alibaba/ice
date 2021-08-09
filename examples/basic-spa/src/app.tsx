import React from 'react';
import { runApp, APP_MODE, IAppConfig } from 'ice';

console.log('APP_MODE', APP_MODE);
const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    errorBoundary: true,
    parseSearchParams: true,
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
      console.log('app show...');
    },
    onHide() {
      console.log('app hide...');
    },
  },
  logger: {
    level: APP_MODE === 'build' ? 'error' : 'debug',
  },
  router: {
    basename: '/ice',
    type: 'hash',
    fallback: <div>加载中...</div>
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
