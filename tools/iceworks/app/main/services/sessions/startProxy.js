const manager = require('./manager');
const startLogDetection = require('./startLogDetection');

class StartProxy {
  constructor() {
    this.sessions = {};
  }
  start(opts, done = () => {}) {
    const session = manager.new(opts, done);
    this.sessions[opts.cwd] = session;
    session.on('data', (data) => {
      startLogDetection(opts.cwd, data);
    });
    session.on('exit', () => {
      this.delete(opts.cwd);
    });
  }
  stop(cwd) {
    if (this.sessions[cwd]) {
      this.sessions[cwd].emit('data', '\n\r已中止调试服务\n\r');
      this.sessions[cwd].destroy();
    }
  }
  delete(cwd) {
    delete this.sessions[cwd];
  }
  has(cwd) {
    return !!this.sessions[cwd];
  }
  checkRuning() {
    return Object.keys(this.sessions).length > 0;
  }
}

module.exports = new StartProxy();
