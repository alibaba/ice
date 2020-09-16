#!/usr/bin/env node
const utils = require('create-cli-utils');
const packageInfo = require('../package.json');
const getBuiltInPlugins = require('../lib');

const forkChildProcessPath = require.resolve('./child-process-start');

(async () => {
  await utils.createCli(getBuiltInPlugins, forkChildProcessPath, packageInfo);
})();
