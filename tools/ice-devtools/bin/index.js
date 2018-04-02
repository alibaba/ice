#!/usr/bin/env node

require('commander')
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('init', 'generate a new project from a template')
  .command('add', 'add a new block/layout/scaffold from a official templates')
  .parse(process.argv);
