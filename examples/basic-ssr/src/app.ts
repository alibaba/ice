import { createApp, IAppConfig } from 'ice'

const appConfig: IAppConfig = {
  app: {
    getInitialData: async () => {
      return { user: { name: 'Jack Ma', id: '01' } }
    }
  },
  router: {
    type: 'browser'
  },
  store: {
    getInitialStates: (initialData) => {
      return initialData
    }
  }
};

createApp(appConfig)
