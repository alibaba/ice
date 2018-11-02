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
  .command('build-block', 'Build block demo')
  .command('build-blocks', 'Build All block demos')
  .command('sync', 'Sync materials to https://mc.fusion.design')
  .parse(process.argv);
