import { createApp } from 'ice'

const appConfig = {
  app: {
    rootId: 'ice-container'
  },
  loglevel: 'warn',
  icestark: {
    type: 'child',
  },
};

createApp(appConfig)
