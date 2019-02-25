const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
const pathExists = require('path-exists');

const { getEnv } = require('../env');

const log = require('../logger');
const Session = require('./sessions/Session');

class CmdError extends Error {
  constructor(message, metadata) {
    super(message);

    this.metadata = metadata;
  }
}

/**
 * 修复项目命令行，添加 build start 脚本
 */

const NPM = {
  exec(cmd, opts = {}, callback) {
    exec(cmd, Object.assign(opts, { env: getEnv() }), callback);
  },
  /**
   * 执行内置 NPM 命令，返回一个 promise 对象
   * @param {Array} args npm 执行参数
   * @param {Object} options 执行参数
   * @return {Object} promise Promise instance
   */
  run(args, options) {
    if (typeof args === 'string') {
      args = args.split(' ');
    }

    const cwd = options.cwd;
    log.debug('npm', args.join(' '), cwd);
    args.push('--scripts-prepend-node-path=auto');

    return new Promise((resolve, reject) => {
      const ps = new Session({
        cwd: cwd,
        shell: 'npm',
        shellArgs: args,
      });

      ps.on('exit', (code) => {
        if (code === 0) {
          resolve(code);
        } else {
          reject(
            new CmdError('runcmd', {
              cmd: 'npm',
              args: args,
            })
          );
        }
      });
    });
  },

  
};

module.exports = NPM;
