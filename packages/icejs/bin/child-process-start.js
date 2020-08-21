#!/usr/bin/env node
const { getBuiltInPlugins, childProcessStart } = require('../lib');

(async() => {
  await childProcessStart(getBuiltInPlugins);
})();
