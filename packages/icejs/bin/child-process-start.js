#!/usr/bin/env node
const utils = require('create-cli-utils');
const getBuiltInPlugins = require('../lib/getBuiltInPlugins');

(async() => {
  await utils.childProcessStart(getBuiltInPlugins);
})();
