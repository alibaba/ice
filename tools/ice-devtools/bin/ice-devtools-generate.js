#!/usr/bin/env node
const cwd = process.cwd();

require('../database/generate')({
  cwd,
});
