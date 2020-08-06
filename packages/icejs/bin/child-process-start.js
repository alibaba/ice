#!/usr/bin/env node
const { childProcessStart } = require('create-cli-utils');
const getBuiltInPlugins = require('../lib/index');

(async() => {
  await childProcessStart(getBuiltInPlugins);
})();
