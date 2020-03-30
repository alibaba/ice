import { createApp, IAppConfig } from 'ice';
import * as React from 'react';
import { ConfigProvider } from '@alifd/next';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => (
      <ConfigProvider prefix="next-fd-">{children}</ConfigProvider>
    ),
  },
  logger: {
    level: 'warn'
  },
  router: {
    type: 'browser',
  },
  icestark: {
    type: 'framework',
    getApps: async () => {
      const apps = await new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              path: '/seller',
              title: '商家平台',
              url: [
                '//ice.alicdn.com/icestark/child-seller-react/index.js',
                '//ice.alicdn.com/icestark/child-seller-react/index.css',
                // '//127.0.0.1:3444/js/index.js',
                // '//127.0.0.1:3444/css/index.css',
              ],
            },
            {
              path: '/waiter',
              title: '小二平台',
              url: [
                '//ice.alicdn.com/icestark/child-waiter-vue/app.js',
                '//ice.alicdn.com/icestark/child-waiter-vue/app.css',
                // '//localhost:8080/app.js',
                // '//localhost:8080/css/app.css',
              ],
            },
          ]);
        }, 1000);
      });
      return apps;
    },
    removeRoutesLayout: true,
  },
};

createApp(appConfig);
