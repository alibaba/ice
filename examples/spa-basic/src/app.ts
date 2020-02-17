import { createApp, APP_MODE } from 'ice'

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
  config: {
    dev: {
      appId: 'dev-id',
      API_URL: 'http://localhost:3333'
    },
    build: {
      API_URL: 'http://github.com/api'
    },
    default: {
      'appId': 'default-id',
      'sercet': 'hahjhjhj'
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
