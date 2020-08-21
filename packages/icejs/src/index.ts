/* eslint @typescript-eslint/no-var-requires: 0 */
const { childProcessStart, createCli } = require('create-cli-utils');
const getBuiltInPlugins = require('./getBuiltInPlugins');

module.exports = {
  getBuiltInPlugins,
  createCli,
  childProcessStart
};
