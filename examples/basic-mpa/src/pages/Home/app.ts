import { createApp } from 'ice'
import Home from './index'

const appConfig = {
  router: {
    routes: [{ path: '/', component: Home }],
  },
}

createApp(appConfig)
