const npmlog = require('npmlog');

const envs = ['verbose', 'info', 'error', 'warn'];
const logLevel =
  envs.indexOf(process.env.LOG_LEVEL) !== -1 ? process.env.LOG_LEVEL : 'info';

npmlog.level = logLevel;

module.exports = npmlog;
