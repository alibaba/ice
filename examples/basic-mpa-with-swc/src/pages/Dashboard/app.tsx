import { runApp, IAppConfig } from 'ice';
import React from 'react';
import routes from './routes';
import store from './store';

const Provider = store.Provider;

const appConfig: IAppConfig = {
  router: {
    routes
  },
  app: {
    addProvider({ children }) {
      return <Provider>{children}</Provider>;
    }
  }
};

runApp(appConfig);
