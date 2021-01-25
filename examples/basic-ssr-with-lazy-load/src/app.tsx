import { runApp, IAppConfig, config, request } from 'ice';
import React from 'react';

const appConfig: IAppConfig = {
  app: {
    getInitialData: async () => {
      const res = await request('/user');
      return res;
    }
  },
  router: {
    type: 'browser',
    fallback: <div style={{background: 'red'}}>fallback</div>
  },
  request: {
    baseURL: config.baseURL
  },
  store: {
    getInitialStates: (initialData) => {
      return initialData.data;
    }
  }
};

runApp(appConfig);
