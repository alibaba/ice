const { EventEmitter } = require('events');

let instance = null;

const CHANNEL_DATA = 'session:data';
const CHANNEL_EXIT = 'session:exit';

class SpcServer extends EventEmitter {
  constructor() {
    super();
    if (instance) {
      return instance;
    }

    this.on(CHANNEL_DATA, (...args) => {
      this.send(CHANNEL_DATA, ...args);
    });

    this.on(CHANNEL_EXIT, (...args) => {
      this.send(CHANNEL_EXIT, ...args);
    });
  }

  send(ch, ...args) {
    if (this.wc) {
      this.wc.send(ch, ...args);
    }
  }
  get wc() {
    if (this.win && !this.win.isDestroyed()) {
      return this.win.webContents;
    }
    return null;
  }

  bindWindow(win) {
    this.win = win;
  }
}
const spc = new SpcServer();

module.exports = spc;
