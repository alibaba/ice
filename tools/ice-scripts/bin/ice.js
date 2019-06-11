#!/usr/bin/env node


const program = require('commander');
const chalk = require('chalk');
const packageInfo = require('../package.json');

console.log(packageInfo.name, packageInfo.version);

console.log();
console.log(chalk.yellow(`当前 ice-scripts 版本 ${packageInfo.version}，ice-scripts@2.0 版本已发布，在可配置性以及扩展性方面做了极大提升，推荐升级：https://ice.work/docs/cli/migrate`));
console.log();

program
  .version(packageInfo.version)
  .usage('<command> [options]')
  .command('build', 'build project')
  .command('dev', 'start server')
  .command('init', 'init project by scaffold')
  .command('add', 'add block');

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
