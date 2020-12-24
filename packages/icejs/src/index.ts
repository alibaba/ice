import * as utils from 'create-cli-utils';
import getBuiltInPlugins = require('./getBuiltInPlugins');

const forkChildProcessPath = require.resolve('../bin/child-process-start');

module.exports = (frameworkName, { packageInfo, extendCli }) => {
  // eslint-disable-next-line global-require
  const pkg = require('../package.json');
  process.env.__FRAMEWORK_NAME__ = frameworkName;
  packageInfo.__ICEJS_INFO__ = { name: pkg.name, version: pkg.version };
  utils.createCli(getBuiltInPlugins, forkChildProcessPath, packageInfo, extendCli);
};
