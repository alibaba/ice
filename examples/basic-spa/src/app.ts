import { createApp, APP_MODE, IAppConfig } from 'ice'

const appConfig: IAppConfig = {
  app: {
    rootId: 'ice-container'
  },
  logger: {
    level: APP_MODE === 'build' ? 'error' : 'debug',
  },
  router: {
    type: 'hash'
  },
  request: {
    timeout: 5000,
    baseURL: '/',
    interceptors: {
      request: {
        onConfig: (config) => {
          return config
        }
      }
    }
  }
};

createApp(appConfig)
