#!/usr/bin/env node
const { childProcessStart } = require('@alib/build-scripts');
const getBuiltInPlugins = require('../lib');

(async() => {
  await childProcessStart(getBuiltInPlugins);
})();
