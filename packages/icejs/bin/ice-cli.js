#!/usr/bin/env node
const utils = require('create-cli-utils');
const getBuiltInPlugins = require('../lib/getBuiltInPlugins');
const packageInfo = require('../package.json');

const forkChildProcessPath = require.resolve('./child-process-start');

(async () => {
  await utils.createCli(getBuiltInPlugins, forkChildProcessPath, packageInfo);
})();
