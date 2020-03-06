import { createApp } from 'ice'
import Dashboard from './index'

const appConfig = {
  router: {
    routes: [{ path: '/', component: Dashboard }],
  },
}

createApp(appConfig)
