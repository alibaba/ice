#!/usr/bin/env node
const utils = require('@alib/build-scripts');
const getBuiltInPlugins = require('../lib/getBuiltInPlugins');

(async() => {
  await utils.childProcessStart(getBuiltInPlugins);
})();
