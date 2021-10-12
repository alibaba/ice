import { runApp } from '@ice/server';
// import session from 'koa-session';
// import * as bucLoginModule from '@ali/midway-buc-login';

runApp({
  // modules: [
  //   bucLoginModule
  // ],
  // addMiddlewares: async ({ app }) => ([
  //   session({ key: 'FAAS_SESS' }, app),
  //   await app.generateMiddleware(bucLoginModule.BucLoginFilter)
  // ]),
  app: {
    async onReady() {
      console.log('runApp onReady');
    }
  }
});
