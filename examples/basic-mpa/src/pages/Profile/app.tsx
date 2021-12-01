import * as React from 'react';
import { runApp, IAppConfig } from 'ice';
import Page from './index';
import store from './store';

const Provider = store.Provider;

const appConfig: IAppConfig = {
  app: {
    rootId: 'custom-container',
    renderComponent: Page,
    addProvider: ({ children }) => {
      return <Provider>{children}</Provider>;
    }
  },
};

runApp(appConfig);
