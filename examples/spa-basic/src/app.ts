import { createApp, APP_MODE, config } from 'ice'

console.log('app config', config);

const appConfig = {
  app: {
    rootId: 'ice-container'
  },
  loglevel: APP_MODE === 'build' ? 'error' : 'debug',
  request: {
    timeout: 5000,
    // baseURL: '/abc',
    interceptors: {
      response: {
        onConfig: (config) => {
          console.log('interceptors response:', config)
          return config
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
