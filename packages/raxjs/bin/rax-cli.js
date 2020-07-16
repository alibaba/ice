#!/usr/bin/env node
const createCli = require('create-cli-utils/lib/cli');
const packageInfo = require('../package.json');
const getBuiltInPlugins = require('../lib');

const forkChildProcessPath = require.resolve('./child-process-start');

(async () => {
  await createCli(getBuiltInPlugins, forkChildProcessPath, packageInfo);
})();
