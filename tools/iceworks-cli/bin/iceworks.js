#!/usr/bin/env node

/* eslint quotes:0, prefer-template:0 */
const chalk = require('chalk');
const program = require('commander');
const checkVersion = require('../lib/checkVersion');

checkVersion();

program.version(require('../package').version).usage('<command> [options]');

program
  .command('start')
  .description('start the iceworks server')
  .option(
    '-p, --port <port>',
    'Port used for the iceworks server (by default search for available port)'
  )
  .action((cmd) => {
    require('../lib/start')(cleanArgs(cmd));
  });

program
  .command('stop')
  .description('stop the iceworks server')
  .action(() => {
    require('../lib/stop')();
  });

// output help information on unknown commands
program.arguments('<command>').action((cmd) => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
});

// add some useful info on help
program.on('--help', () => {
  console.log();
  console.log(
    `  Run ${chalk.cyan(
      `iceworks <command> --help`
    )} for detailed usage of given command.`
  );
  console.log();
});

program.commands.forEach((c) => c.on('--help', () => console.log()));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  require('../lib/start')(cleanArgs());
}

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

// commander passes the Command object itself as options,
// extract only actual options into a fresh object.
function cleanArgs(cmd) {
  const args = {};
  if (cmd) {
    cmd.options.forEach((o) => {
      const key = camelize(o.long.replace(/^--/, ''));
      // if an option is not present and Command has a method with the same name
      // it should not be copied
      if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
        args[key] = cmd[key];
      }
    });
  }
  return args;
}
