const { EventEmitter } = require('events');
const { StringDecoder } = require('string_decoder');
const defaultShell = require('default-shell');
const is = require('electron-is');
const { getEnv } = require('../../env');
const { WIN_NPM_CMD } = require('../../paths');
const logger = require('../../logger');

const isWin = is.windows();

const createNodePtyError = () => new Error(
  '`node-pty` failed to load. Typically this means that it was built incorrectly. Please check the `readme.md` to more info.'
);

let spawn;
try {
  spawn = require('node-pty').spawn;
} catch (err) {
  throw createNodePtyError();
}

module.exports = class Sesstion extends EventEmitter {
  constructor({
    rows = 40,
    cols: columns = 80,
    cwd,
    shell,
    shellArgs,
    env = {},
  }) {
    super();
    const decoder = new StringDecoder('utf8');

    const spawnEnv = Object.assign({}, getEnv(), env);

    if (isWin && shell === 'npm') {
      shell = WIN_NPM_CMD;
    }

    try {
      this.pty = spawn(shell, shellArgs, {
        cols: columns,
        rows,
        cwd,
        env: spawnEnv,
      });
      const command = `${shell} ${shellArgs.join(' ')}\r`;
      logger.info('command:', command);
    } catch (err) {
      if (/is not a function/.test(err.message)) {
        throw createNodePtyError();
      } else {
        throw err;
      }
    }

    this.pty.on('data', (data) => {
      if (this.ended) {
        return;
      }
      this.emit('data', decoder.write(data));
    });

    this.pty.on('exit', (code, signal) => {
      if (!this.ended) {
        this.ended = true;
        this.emit('exit', code, signal);
      }
    });

    this.shell = shell;
  }

  exit() {
    this.destroy();
  }

  destroy() {
    try {
      this.pty.kill();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('exit error', err.stack);
    }
    this.emit('exit', 0, 0);
    this.ended = true;
  }
};
