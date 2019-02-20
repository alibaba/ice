const uuid = require('uuid');
const { EventEmitter } = require('events');

const Session = require('./Session');
const spc = require('../../spc');

const sessions = {};

const CHANNEL_DATA = 'session:data';
const CHANNEL_EXIT = 'session:exit';
const CHANNEL_NEWLINE = 'session:newline';

class Sessions extends EventEmitter {
  constructor() {
    super();
  }

  /**
   * 新建一个 session
   * @param {object} options Session 对象参数
   */
  new({ uid = uuid.v4(), cwd, cwdClient, shell, shellArgs, env = {} }, done = () => {}) {
    const session = new Session({ 
      cwd: cwdClient || cwd, // 如果存在cwdClient，则说明是node模板，使用传入的前端目录，其他则用cwd
      shell, 
      shellArgs, 
      env 
    });
    sessions[uid] = session;
    spc.emit(CHANNEL_DATA, {
      uid: uid,
      cwd,
      pid: session.pty.pid,
      data: `${shell} ${shellArgs.join(' ')} \n\r`,
    });
    session.on('data', (data) => {
      spc.emit(CHANNEL_DATA, { uid: uid, pid: session.pty.pid, cwd, data });
    });

    session.on('exit', (code, signal) => {
      spc.emit(CHANNEL_EXIT, {
        uid: uid,
        pid: session.pty.pid,
        cwd,
        code,
        signal,
      });
      spc.emit(CHANNEL_NEWLINE, { cwd: cwd });
      this.delete(uid);
      done(code, signal);
    });
    return session;
  }

  delete(uid) {
    delete sessions[uid];
  }

  destory() {
    return new Promise((resolve, reject) => {
      Object.keys(sessions).forEach((uid) => {
        const session = sessions[uid];
        session.destroy();
      });
      resolve();
    });
  }
}

module.exports = new Sessions();
