import RemoteLogger from './lib/remoteLogger';

export default class AppBootHook {
  app: any;

  constructor(app) {
    this.app = app;
  }

  async didLoad() {
    // send server log to remote in production
    if (this.app.config.env === 'prod') {
      this.app.getLogger().set('remote', new RemoteLogger({ level: 'INFO' }));
    }
  }
}
