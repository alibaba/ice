import React from 'react';
import { runApp, IAppConfig } from 'ice';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container'
  },
  router: {
    fallback: <div>加载中...</div>
  },
  logger: {
    level: 'warn'
  },
  icestark: {
    type: 'child'
  },
};

runApp(appConfig);
