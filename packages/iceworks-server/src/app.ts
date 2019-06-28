import RemoteLogger from './lib/remoteLogger';

export default class AppBootHook {
  app: any;

  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    // 线上环境远程上传错误log
    if (this.app.config.env === 'prod') {
      this.app.getLogger().set('remote', new RemoteLogger({ level: 'INFO' }));
    }
  }
}
