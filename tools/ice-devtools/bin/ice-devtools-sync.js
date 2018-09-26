#!/usr/bin/env node

const cwd = process.cwd();
require('../lib/sync-materials')({
  cwd,
});
