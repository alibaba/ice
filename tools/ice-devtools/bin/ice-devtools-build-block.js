#!/usr/bin/env node

const cwd = process.cwd();
require('../lib/build-block')({
  cwd,
});
