import React from 'react';
import { createApp, APP_MODE, IAppConfig, request } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    errorBoundary: true,
    parseSearchParams: true,
    getInitialData: async() => {
      const result = await request('/api/repo');
      console.log('request result:', result);
    },
    // onShow() {
    //   console.log('app show...');
    // },
    // onHide() {
    //   console.log('app hide...');
    // },
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

createApp(appConfig);
