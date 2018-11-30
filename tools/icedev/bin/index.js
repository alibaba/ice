#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const cwd = process.cwd();
const checkVersion = require('../util/check-version');

const supportCommands = {
  init: 'generate a new project from a template',
  add: 'add a new block/layout/scaffold from a official templates',
  start: 'Start Dev Server',
  build: 'Build Component',
  screenshot: 'Create screenshot.png',
  generate: 'Generate database json',
  sync: 'Sync materials to https://fusion.design',
};

program
  .version(require('../package').version).usage('[command] [options]');

Object.entries(supportCommands).forEach(entry => {
  program
    .command(entry[0])
    .description(chalk.green(entry[1]))
    .action(function() {
      const fn = require(`../lib/${entry[0]}`);
      const args = [cwd].concat(Array.prototype.slice.call(arguments))
      fn.apply(global, args);
    });
});

program.command('*').description(chalk.gray('help')).action(function() {
  console.log(chalk.red('No sub command matched, please use --help'));
})

checkVersion(function() {
  program.parse(process.argv);
});
