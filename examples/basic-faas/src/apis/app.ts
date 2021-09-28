import { runApp } from '@ice/server';
// import session from 'koa-session';
// import * as bucLoginModule from '@ali/midway-buc-login';

runApp({
  modules: [
    // bucLoginModule
  ],
  middlewares: [
    // function () {
    //   return session({
    //     key: 'FAAS_SESS',
    //     maxAge: 24 * 3600 * 1000,
    //     signed: false
    //   }, this.app)
    // },
    // function () {
    //   return (this as any).app.generateMiddleware(bucLoginModule.BucLoginFilter)
    // }
  ],
  app: {
    async onReady() {
      console.log('runApp onReady');
    }
  }
});
