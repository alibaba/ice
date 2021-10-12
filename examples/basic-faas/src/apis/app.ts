import { runApp } from '@ice/server';
import logger from './middlewares/logger';
// import session from 'koa-session';
// import * as bucLoginModule from '@ali/midway-buc-login';

runApp({
  modules: [
    // bucLoginModule
  ],
  addMiddlewares: async ({ app, ...rest }) => {
    console.log('addMiddlewares rest args', rest);
    return [
      logger,
      // session({ key: 'FAAS_SESS' }, app),
      // await app.generateMiddleware(bucLoginModule.BucLoginFilter)
  ]
},
  app: {
    async onReady() {
      console.log('runApp onReady');
    }
  }
});
