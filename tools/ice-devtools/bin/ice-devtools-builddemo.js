#!/usr/bin/env node

// const argv = require('commander')
//   .version(require('../package').version)
//   .usage('<command> [options]')
//   .parse(process.argv);

const cwd = process.cwd();
require('../lib/builddemo')({
  cwd,
});
