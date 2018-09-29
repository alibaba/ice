#!/usr/bin/env node

const cwd = process.cwd();
require('../lib/build-blocks')({
  cwd,
});
