#!/usr/bin/env node
const program = require('commander');
const checkNodeVersion = require('./checkNodeVersion');
const start = require('./start');
const build = require('./build');
const test = require('./test');

module.exports = async (getBuiltInPlugins, forkChildProcessPath, packageInfo, extendCli) => {
  if (packageInfo.__ICEJS_INFO__) {
    console.log(
      `${packageInfo.name} ${packageInfo.version}`,
      `(${packageInfo.__ICEJS_INFO__.name} ${packageInfo.__ICEJS_INFO__.version})`
    );
  } else {
    console.log(packageInfo.name, packageInfo.version);
  }
  // finish check before run command
  checkNodeVersion(packageInfo.engines.node, packageInfo.name);

  program
    .version(packageInfo.version)
    .usage('<command> [options]');

  program
    .command('build')
    .description('build project')
    .allowUnknownOption()
    .option('--config <config>', 'use custom config')
    .action(async function() {
      await build(getBuiltInPlugins);
    });

  program
    .command('start')
    .description('start server')
    .allowUnknownOption()
    .option('--config <config>', 'use custom config')
    .option('-h, --host <host>', 'dev server host', '0.0.0.0')
    .option('-p, --port <port>', 'dev server port')
    .action(async function() {
      await start(getBuiltInPlugins, forkChildProcessPath);
    });

  program
    .command('test')
    .description('run tests with jest')
    .allowUnknownOption() // allow jest config
    .option('--config <config>', 'use custom config')
    .action(async function() {
      await test(getBuiltInPlugins);
    });

  if (typeof extendCli === 'function') {
    extendCli(program);
  }

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
};
