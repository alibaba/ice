import { createApp, APP_MODE } from 'ice'

const appConfig = {
  app: {
    rootId: 'ice-container'
  },
  logger: {
    level: APP_MODE === 'build' ? 'error' : 'debug',
  },
  request: {
    timeout: 5000,
    // baseURL: '/abc',
    interceptors: {
      response: {
        onConfig: (conf) => {
          console.log('interceptors response:', conf)
          return conf
        }
      }
    }
  }
};

createApp(appConfig)
