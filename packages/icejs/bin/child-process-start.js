#!/usr/bin/env node
const utils = require('create-cli-utils');
const getBuiltInPlugins = require('../lib/getBuiltInPlugins').default;

(async () => {
  await utils.childProcessStart(getBuiltInPlugins);
})();
