#!/usr/bin/env node
const { getBuiltInPlugins, createCli } = require('../lib');
const packageInfo = require('../package.json');

const forkChildProcessPath = require.resolve('./child-process-start');

(async () => {
  await createCli(getBuiltInPlugins, forkChildProcessPath, packageInfo);
})();
