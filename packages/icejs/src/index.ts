/* eslint @typescript-eslint/no-var-requires: 0 */
const utils = require('create-cli-utils');
const getBuiltInPlugins = require('./getBuiltInPlugins');
const pkg = require('../package.json');

const forkChildProcessPath = require.resolve('../bin/child-process-start');

module.exports = (frameworkName, { packageInfo }, extendCli) => {
  process.env.__FRAMEWORK_NAME__ = frameworkName;
  packageInfo.__ICEJS_INFO__ = { name: pkg.name, version: pkg.version };
  utils.createCli(getBuiltInPlugins, forkChildProcessPath, packageInfo, extendCli);
};

