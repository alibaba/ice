const start = require('./start');
const build = require('./build');
const test = require('./test');
const childProcessStart = require('./child-process-start');
const createCli = require('./create-cli');

module.exports = {
  start,
  build,
  test,
  childProcessStart,
  createCli
};
