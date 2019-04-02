const electronLog = require('electron-log');
const is = require('electron-is');
const isDev = is.windows();

let log;
if (isDev) {
  log = console;
} else {
  log = electronLog;
  log.transports.file.level = 'silly'; // 开启完整的日志模式
  log.transports.file.maxSize = 30 * 1024 * 1024;
}

function logger(type, ...args) {
  if (isDev) {
    args.unshift(`[${type}]`);
  }
  const logFunc = log[type] || log.info;
  logFunc(...args);
}


module.exports = {
  debug: logger.bind(null, 'debug'),
  error: logger.bind(null, 'error'),
  info: logger.bind(null, 'info'),
  verbose: logger.bind(null, 'verbose'),
  warn: logger.bind(null, 'warn'),
};
