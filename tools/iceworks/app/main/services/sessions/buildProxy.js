const manager = require('./manager');

class BuildProxy {
  constructor() {
    this.sessions = {};
  }
  start(opts, done = () => {}) {
    const session = manager.new(opts, done);
    this.sessions[opts.cwd] = session;
    session.on('exit', () => {
      this.delete(opts.cwd);
    });
  }
  has(cwd) {
    return !!this.sessions[cwd];
  }
  delete(cwd) {
    delete this.sessions[cwd];
  }
  checkRuning() {
    return Object.keys(this.sessions).length > 0;
  }
}

module.exports = new BuildProxy();
