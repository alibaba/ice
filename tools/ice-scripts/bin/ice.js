#!/usr/bin/env node

'use strict';

const program = require('commander');

const packageInfo = require('../package.json');

console.log(packageInfo.name, packageInfo.version);
program
  .version(packageInfo.version)
  .usage('<command> [options]')
  .command('build', 'build project')
  .command('dev', 'start server');

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
