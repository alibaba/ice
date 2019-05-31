#!/usr/bin/env node

/* eslint quotes:0, prefer-template:0 */
const chalk = require('chalk');
const program = require('commander');
const pkgData = require('../package');
const checkVersion = require('../lib/checkVersion');

async function check() {
  await checkVersion();
}

// check node version and iceworks version
check();

console.log('iceworks cli', pkgData.version);

program.version(pkgData.version).usage('<command> [options]');

// output help information on unknown commands
program.arguments('<command>').action((cmd) => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
});

program
  .command('init')
  .description('init project by template')
  .option(
    '-t, --template <template>',
    'Specify the npm package name for the template'
  )
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ iceworks init');
    console.log('  $ iceworks init -t @icedesign/lite-scaffold');
  })
  .action((cmd) => {
    require('../command/init')(cleanArgs(cmd));
  });

program
  .command('add [type]')
  .description('add block to current directory')
  .option(
    '-t, --template <template>',
    'Specify the npm package name of the block'
  )
  .option(
    '-n, --name <name>',
    'Specify the block directory name like CustomBlock'
  )
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ iceworks add block');
    console.log('  $ iceworks add block -t @icedesign/user-landing-block');
    console.log('  $ iceworks add block -t @icedesign/user-landing-block -n CustomBlock');
  })
  .action((type, cmd) => {
    require('../command/addBlock')(cleanArgs(cmd));
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
    if (cmd.parent && cmd.parent.rawArgs) {
      args.command = cmd.parent.rawArgs[2];
    }
  }
  return args;
}

if (!process.argv.slice(2).length) {
  // TODO: start web server for iceworks 3.0
  // require('../command/start')(cleanArgs());
  program.outputHelp();
}
