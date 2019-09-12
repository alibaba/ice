#!/usr/bin/env node
const chalk = require('chalk');
const program = require('commander');
const semver = require('semver');
const path = require('path');
const userHome = require('user-home');
const packageConfig = require('../package');
const checkVersion = require('../lib/checkVersion');

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

program
  .command('use <version>')
  .description('specify the iceworks-core version')
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('Use the available 3.0.0 release')
    console.log('  $ iceworks use 3.0.0');
  })
  .action((version, cmd) => {
    (async () => {
      const options = cleanArgs(cmd);
      options.version = version;
      try {
        // eslint-disable-next-line global-require
        await require('../command/start')(options);
      }  catch (err) {
        console.error(err);
        process.exit(1);
      }
    })();
  })

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

(async () => {
  // log local version
  logCLIVersion();

  // check node version
  checkNodeVersion();

  try {
    // check iceworks version
    await checkIceworksVersion();
  } catch (error) {
    console.log(error);
  }

  if (!process.argv.slice(2).length) {
    // start web server for iceworks 3.0
    try {
      // eslint-disable-next-line global-require
      await require('../command/start')(cleanArgs());
    }  catch (err) {
      console.error(err);
      process.exit(1);
    }
  }
})();

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
  const iceworksCLIVersion = packageConfig.version;
  const pkgPath = path.join(userHome, 'iceworks-server', 'package.json')
  // eslint-disable-next-line
  const iceworksCorePackageConfig = require(pkgPath);
  const iceworksCoreVersion = iceworksCorePackageConfig.version;

  console.log(chalk.grey('iceworks CLI:', iceworksCLIVersion));
  console.log(chalk.grey('iceworks Core:', iceworksCoreVersion));
}
