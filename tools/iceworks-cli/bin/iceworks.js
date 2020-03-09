#!/usr/bin/env node
const chalk = require('chalk');
const program = require('commander');
const semver = require('semver');
const fse = require('fs-extra');
const packageConfig = require('../package');
const checkVersion = require('../lib/checkVersion');
const log = require('../lib/log');
const { TEMP_PATH } = require('../lib/constants');

program.version(packageConfig.version).usage('<command> [options]');

// output help information on unknown commands
program.arguments('<command>').action((cmd) => {
  program.outputHelp();
  console.log(chalk.red(`Unknown command ${chalk.yellow(cmd)}`));
  console.log();
});

program
  .command('start')
  .description('start and open the iceworks')
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ iceworks start');
  })
  .action(async (version, cmd) => {
    try {
      // eslint-disable-next-line global-require
      await require('../command/start')();
    }  catch (err) {
      log.error('iceworks start error', err.message);
      console.error(err.stack);
      process.exit(1);
    }
  });

program
  .command('init [type] [npmName]')
  .description('init project/material/component by template')
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ iceworks init');
    console.log('  $ iceworks init component');
    console.log('  $ iceworks init project @icedesign/lite-scaffold');
  })
  .action(async (type, npmName, cmd) => {
    // 兼容 iceworks init @icedesign/pro-scaffold
    if (type && ['project', 'material', 'component'].indexOf(type) === -1) {
      npmName = type;
      type = 'project';
    }

    const options = cleanArgs(cmd);
    options.npmName = npmName;
    options.type = type;

    try {
      // eslint-disable-next-line global-require
      await require('../command/init')(options);
    }  catch (err) {
      await fse.remove(TEMP_PATH);
      log.error('iceworks init error', err.message);
      console.error(err.stack);
      process.exit(1);
    }
  });

program
  .command('add [materialType] [npmName]')
  .description('add block to current directory')
  .option(
    '-n, --name <name>',
    'Specify the block directory name like CustomBlock'
  )
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ iceworks add');
    console.log('  $ iceworks add block');
    console.log('  $ iceworks add @icedesign/user-landing-block');
    console.log('  $ iceworks add @icedesign/user-landing-block -n CustomBlock');
  })
  .action(async (materialType, npmName, cmd) => {
    // 兼容 iceworks add @icedesign/block-test
    if (materialType && ['scaffold', 'block', 'component'].indexOf(materialType) === -1) {
      npmName = materialType;
      materialType = null;
    }

    const options = cleanArgs(cmd);
    options.materialType = materialType;
    options.npmName = npmName;

    try {
      // eslint-disable-next-line global-require
      await require('../command/add')(options);
    }  catch (err) {
      await fse.remove(TEMP_PATH);
      log.error('iceworks add error', err.message);
      console.error(err.stack);
      process.exit(1);
    }
  });

program
  .command('generate')
  .description('generate material collection data(material.json)')
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ iceworks generate');
  })
  .action(async () => {
    try {
      // eslint-disable-next-line global-require
      await require('../command/generate')();
    }  catch (err) {
      log.error('iceworks generate error', err.message);
      console.error(err.stack);
      process.exit(1);
    }
  });

program
  .command('sync')
  .description(`sync materials data to Fusion Material Center`)
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('  $ iceworks sync');
  })
  .action(async () => {
    try {
      // eslint-disable-next-line global-require
      await require('../command/sync')();
    }  catch (err) {
      log.error('iceworks sync error', err.message);
      console.error(err.stack);
      process.exit(1);
    }
  });

program
  .command('use <version>')
  .description('specify the iceworks-core version')
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('Use the available 3.0.0 release');
    console.log('  $ iceworks use 3.0.0');
  })
  .action(async (version, cmd) => {
    const options = cleanArgs(cmd);
    options.version = version;
    try {
      // eslint-disable-next-line global-require
      await require('../command/start')(options);
    }  catch (err) {
      log.error('iceworks start error', err.message);
      console.error(err.stack);
      process.exit(1);
    }
  });

program
  .command('config [type] [key] [value]')
  .description('operate iceworks global config')
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('Use the available 3.0.0 release');
    console.log('  $ iceworks config list');
    console.log('  $ iceworks config get registry');
    console.log('  $ iceworks config set registry https://registry.npmjs.org');
  })
  .action(async (type, key, value, cmd) => {
    const options = cleanArgs(cmd);
    options.type = type;
    options.key = key;
    options.value = value;
    try {
      // eslint-disable-next-line global-require
      await require('../command/config')(options);
    }  catch (err) {
      log.error('iceworks config error', err.message);
      console.error(err.stack);
      process.exit(1);
    }
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

// log local version
logCLIVersion();

// check node version
checkNodeVersion();

if (!process.argv.slice(2).length) {
  console.log();
  console.log(chalk.cyan('If you want to start iceworks web page, please use `iceworks start`'));
  console.log();

  program.help();
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
    console.log(chalk.yellow(`A newer version of iceworks-cli is available(CHANGELOG: ${chalk.blue('https://github.com/alibaba/ice/blob/master/tools/iceworks-cli/CHANGELOG.md')})`));
    console.log(`  latest:     + ${chalk.yellow(latestVersion)}`);
    console.log(`  installed:  + ${chalk.red(packageVersion)} \n`);
    console.log(`  how to update: ${chalk.red('npm install iceworks@latest -g')} \n`);
  }
}

function logCLIVersion () {
  console.log(chalk.grey('iceworks CLI:', packageConfig.version));
}
