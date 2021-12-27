import { runApp, IAppConfig } from 'ice';
import * as React from 'react';
import { CompatibleAppConfig } from '@ice/stark/lib/AppRoute';
import { ConfigProvider } from '@alifd/next';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    addProvider: ({ children }) => {
      return <ConfigProvider prefix="next-fd-">{children}</ConfigProvider>;
    },
  },
  router: {
    type: 'browser',
    fallback: <div>加载中...</div>
  },
  icestark: {
    type: 'framework',
    getApps: async () => {
      const apps: CompatibleAppConfig[] = await new Promise((resolve) => {
        setTimeout(() => {
          const microConfig = [
            {
              path: '/seller',
              title: '商家平台',
              // loadScriptMode: 'import',
              url: [
                'https://iceworks.oss-cn-hangzhou.aliyuncs.com/icestark/child-seller-react/build/js/index.js',
                'https://iceworks.oss-cn-hangzhou.aliyuncs.com/icestark/child-seller-react/build/css/index.css',
                // '//127.0.0.1:3444/js/index.js',
                // '//127.0.0.1:3444/css/index.css',
              ],
            },
            {
              path: '/waiter',
              title: '小二平台',
              url: [
                'https://iceworks.oss-cn-hangzhou.aliyuncs.com/icestark/child-waiter-vue/dist/js/app.js',
                'https://iceworks.oss-cn-hangzhou.aliyuncs.com/icestark/child-waiter-vue/dist/css/app.css',
                // '//localhost:8080/app.js',
                // '//localhost:8080/css/app.css',
              ],
            },
          ];
          resolve(microConfig);
        }, 1000);
      });
      return apps;
    },
    removeRoutesLayout: true,
  },
};

runApp(appConfig);
