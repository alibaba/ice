import React from 'react';
import { runApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
    renderComponent: () => <div>Hello</div>,
  },
  router: {}
};

runApp(appConfig);
