/* eslint-disable import/first */
if (typeof window === 'object') {
  const fassEnv = window.g_config && window.g_config.faasEnv;
  if (fassEnv !== 'local') {
    // eslint-disable-next-line camelcase
    __webpack_public_path__ = window.resourceBaseUrl;
  }
}

import { runApp, IAppConfig, request } from 'ice';
import { defaults } from '@midwayjs/hooks/request';

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container',
  },
  router: {
    type: 'browser',
  },
};

defaults.request = request;

runApp(appConfig);
