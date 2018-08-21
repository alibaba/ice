#!/usr/bin/env node

require('commander')
  .version(require('../package').version)
  .usage('<command> [options]')
  .command('init', 'generate a new project from a template')
  .command('add', 'add a new block/layout/scaffold from a official templates')
  .command('start', 'Start Dev Server')
  .command('build', 'Build Component')
  .command('screenshot', 'Create screenshot.png')
  .command('generate', 'Generate database json')
  .parse(process.argv);
