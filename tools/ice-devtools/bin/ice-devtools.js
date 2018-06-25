#!/usr/bin/env node

require('commander')
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('init', 'generate a new project from a template')
  .command('add', 'add a new block/layout/scaffold from a official templates')
  .command('start', 'Start Dev Server')
  .command('generate', 'Generate database json')
  .command('demo', 'build html for demo/ ')
  .command('screenshot', 'create screenshot.png')
  .parse(process.argv);
