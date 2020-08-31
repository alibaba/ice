#!/usr/bin/env node
const { childProcessStart } = require('create-cli-utils');
const getBuiltInPlugins = require('../lib');

(async() => {
  await childProcessStart(getBuiltInPlugins);
})();
