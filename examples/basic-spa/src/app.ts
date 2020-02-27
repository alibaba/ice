import { createApp, APP_MODE, config } from 'ice'

console.log('app config', config);

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
  },
  store: {
    initialStates: {
      user: {
        name: 'taoxiaobao',
        age: 21
      },
      login: {
        isLogin: true
      }
    }
  }
};

createApp(appConfig)
