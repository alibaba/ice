#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const cwd = process.cwd();
const checkVersion = require('../util/check-version');

const supportCommands = {
  init: {
    desc: 'generate a new project from a template',
    options: [{
      name: '--offline',
      desc: 'use cached template',
    }]
  },
  add: {
    desc: 'add a new block/layout/scaffold from a official templates',
  },
  start: {
    desc: 'Start Dev Server',
  },
  build: {
    desc: 'Build Component',
  },
  screenshot: {
    desc: 'Create screenshot.png',
  },
  generate: {
    desc: 'Generate database json',
  },
  sync: {
    desc: 'Sync materials to https://fusion.design',
  },
};

program
  .version(require('../package').version).usage('[command] [options]');

Object.entries(supportCommands).forEach(entry => {
  let command = program
    .command(entry[0])
    .description(chalk.green(entry[1].desc));

  entry[1].options && entry[1].options.forEach(opt => {
    command = command.option(opt.name, opt.desc);
  });

  command.action(function (cmd) {
    const fn = require(`../lib/${entry[0]}`);
    const args = [cwd, cmd];
    fn.apply(global, args);
  });
});

program.command('*').description(chalk.gray('help')).action(function () {
  console.log(chalk.red('No sub command matched, please use --help'));
})

checkVersion(function () {
  program.parse(process.argv);
});
