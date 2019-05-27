const npmlog = require('npmlog');

const envs = ['verbose', 'info', 'error', 'warn'];
const logLevel = envs.indexOf(process.env.LOG_LEVEL) !== -1 ? process.env.LOG_LEVEL : 'info';

npmlog.level = logLevel;

// LOG_LEVEL=verbose ice dev
// log.verbose: 调试日志
// log.info
// log.error
module.exports = npmlog;
