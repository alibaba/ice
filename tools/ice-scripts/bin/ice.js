#!/usr/bin/env node

'use strict';

const program = require('commander');
const chalk = require('chalk');

const packageInfo = require('../package.json');

console.log(packageInfo.name, packageInfo.version);
program
  .version(packageInfo.version)
  .usage('<command> [options]')

program
  .command('build', 'build project')
  .command('dev', 'start server')
  .command('server', 'start a static assets server, alias `http-server`');

// output help information on unknown commands
program.arguments('<command>').action((cmd) => {
  const commandNames = program.commands.map((c) => {
    return c.name();
  });

  if (!commandNames.includes(cmd)) {
    program.outputHelp();
    console.log(`\n  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
    console.log();
  }
});

program.parse(process.argv);

const proc = program.runningCommand;

if (proc) {
  proc.on('close', process.exit.bind(process));
  proc.on('error', () => {
    process.exit(1);
  });
}

const subCmd = program.args[0];
if (!subCmd) {
  program.help();
}
