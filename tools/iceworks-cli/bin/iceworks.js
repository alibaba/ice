#!/usr/bin/env node
const chalk = require('chalk');
const program = require('commander');
const semver = require('semver');
const packageConfig = require('../package');
const checkVersion = require('../lib/checkVersion');

// log local version
logCLIVersion();

// check node version
checkNodeVersion();

// check iceworks version
checkIceworksVersion();

program.version(packageConfig.version).usage('<command> [options]');

// output help information on unknown commands
program.arguments('<command>').action((cmd) => {
  program.outputHelp();
  console.log(` chalk.red('Unknown command ${chalk.yellow(cmd)}.`);
  console.log();
});

program
  .command('init [npmName]')
  .description('init project by template')
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ iceworks init');
    console.log('  $ iceworks init @icedesign/lite-scaffold');
  })
  .action((npmName, cmd) => {
    const options = cleanArgs(cmd);
    options.npmName = npmName;
    // eslint-disable-next-line global-require
    require('../command/init')(options);
  });

program
  .command('add <npmName>')
  .description('add block to current directory')
  .option(
    '-n, --name <name>',
    'Specify the block directory name like CustomBlock'
  )
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ iceworks add @icedesign/user-landing-block');
    console.log('  $ iceworks add @icedesign/user-landing-block -n CustomBlock');
  })
  .action((npmName, cmd) => {
    const options = cleanArgs(cmd);
    options.npmName = npmName;
    // eslint-disable-next-line global-require
    require('../command/addBlock')(options);
  });

// add some useful info on help
program.on('--help', () => {
  console.log();
  console.log(
    `  Run ${chalk.cyan('iceworks <command> --help')} for detailed usage of given command.`
  );
  console.log();
});

program.commands.forEach((c) => c.on('--help', () => console.log()));

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  // start web server for iceworks 3.0
  // eslint-disable-next-line global-require
  require('../command/start')(cleanArgs());
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
    if (cmd.parent && cmd.parent.rawArgs) {
      args.command = cmd.parent.rawArgs[2];
    }
  }
  return args;
}

function checkNodeVersion() {
  if (!semver.satisfies(process.version, packageConfig.engines.node)) {
    console.log();
    console.log(
      chalk.red(
        `You must upgrade node to ${packageConfig.engines.node} to use iceworks`
      )
    );
    console.log();
    process.exit(1);
  }
}

async function checkIceworksVersion() {
  const packageName = 'iceworks';
  const packageVersion = packageConfig.version;
  const latestVersion = await checkVersion(packageName, packageVersion);
  if (latestVersion) {
    console.log(chalk.yellow('\n  A newer version of iceworks-cli is available.\n'));
    console.log(`  latest:     + ${chalk.green(latestVersion)}`);
    console.log(`  installed:  + ${chalk.red(packageVersion)} \n`);
  }
}

function logCLIVersion () {
  const iceworksCLIVersion = packageConfig.version;
  const iceworksCorePackageConfig = require('../server/package.json');
  const iceworksCoreVersion = packageConfig.version;

  console.log(chalk.grey('iceworks CLI:', iceworksCLIVersion));
  console.log(chalk.grey('iceworks Core:', iceworksCoreVersion));
}
