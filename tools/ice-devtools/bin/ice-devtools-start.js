#!/usr/bin/env node

// const argv = require('commander')
//   .version(require('../package').version)
//   .usage('<command> [options]')
//   .parse(process.argv);

const { readFileSync } = require('fs');
const { join, resolve } = require('path');

const cwd = process.cwd();
const type = getType(cwd);
switch (type) {
  case 'block':
    require('../lib/server')({
      cwd,
    });
    break;

  case 'component':
    require('../lib/component-dev-server')({
      cwd,
    });
    break;

  default:
    process.exit(1);
}



/**
 * 区分 组件 or 区块
 * component or block
 */
function getType(workDir) {
  const pkg = require(join(workDir, 'package.json'));
  let type = 'block';
  if (Array.isArray(pkg.keywords) && pkg.keywords.some((kw) => {
    return /component/.test(kw);
  })) {
    type = 'component';
  }
  return type;
}
