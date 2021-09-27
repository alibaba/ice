import { runApp, IAppConfig, config } from 'ice';
import React from 'react';

const delay = (time) => new Promise<void>((resolve) => setTimeout(() => resolve(), time));

const appConfig: IAppConfig = {
  app: {
    getInitialData: async () => {
      // const res = await request('/user');
      // return res;
      await delay(1500);

      return {
        initialStates: {
          user: {
            name: 'Jack Ma',
            id: 10001,
          }
        },
      };
    }
  },
  router: {
    type: 'browser',
    fallback: <div style={{background: 'red'}}>fallback</div>
  },
  request: {
    baseURL: config.baseURL
  }
};

runApp(appConfig);
