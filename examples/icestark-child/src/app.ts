import { createApp } from 'ice'

const appConfig = {
  app: {
    rootId: 'ice-container'
  },
  logger: {
    level: 'warn'
  },
  icestark: {
    type: 'child',
  },
};

createApp(appConfig)
