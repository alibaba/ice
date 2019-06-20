#!/usr/bin/env node
const program = require('commander');
const packageInfo = require('../package.json');
const checkUpdater = require('../lib/utils/checkUpdater');
const checkNodeVersion = require('../lib/utils/checkNodeVersion');
const validationSassAvailable = require('../lib/utils/validationSassAvailable');

(async () => {
  console.log(packageInfo.name, packageInfo.version);
  // finish check before run command
  checkNodeVersion(packageInfo.engines.node);
  validationSassAvailable();
  await checkUpdater();

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
})();
