const log = require('../logger');
const Session = require('./sessions/Session');
const { NRM_CLI } = require('../paths');

class CmdError extends Error {
  constructor(message, metadata) {
    super(message);

    this.metadata = metadata;
  }
}

/**
 * 注册 nrm 命令： https://github.com/Pana/nrm
 */

const nrm = {
  /**
   * 执行 nrm 命令，返回一个 promise 对象
   * @param {Array} args nrm 执行参数
   * @param {Object} options 执行参数
   * @return {Object} promise Promise instance
   */
  run(args, options = {}) {
    if (typeof args === 'string') {
      args = args.split(' ');
    }

    const cwd = options.cwd || process.cwd();
    log.debug('nrm', args.join(' '), cwd);

    return new Promise((resolve, reject) => {
      const ps = new Session({
        cwd,
        shell: NRM_CLI,
        shellArgs: args,
      });

      let result = {};
      ps.on('data', (data) => {
        result = { data };
      });

      ps.on('exit', (code) => {
        if (code === 0) {
          resolve(result.data);
        } else {
          reject(
            new CmdError('runcmd', {
              cmd: 'nrm',
              args,
            })
          );
        }
      });
    });
  },
};

module.exports = nrm;
