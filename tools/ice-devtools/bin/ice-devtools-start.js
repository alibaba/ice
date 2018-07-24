#!/usr/bin/env node

// const argv = require('commander')
//   .version(require('../package').version)
//   .usage('<command> [options]')
//   .parse(process.argv);

const { readFileSync } = require('fs');
const { join, resolve } = require('path');
const { getType } = require('../shared/utils');

const cwd = process.cwd();
const type = getType(cwd);
switch (type) {
  case 'block':
    require('../lib/server')({
      cwd,
    });
    break;

  case 'component':
    require('../lib/component-build')(cwd, { watch: true });
    require('../lib/component-dev-server')({
      cwd,
    });
    break;

  default:
    process.exit(1);
}
