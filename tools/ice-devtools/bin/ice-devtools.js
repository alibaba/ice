#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const semver = require('semver');
const updateNotifier = require('update-notifier');
const dotenv = require('dotenv');
const packageJson = require('../package.json');
const COMMANDS = require('../config/commands');
const optionsAttachToEnv = require('../utils/options-attach-to-env');
const goldlog = require('../utils/goldlog');
const boxenLog = require('../utils/boxen-log');


// 统计用户版本
goldlog('version', {
  version: packageJson.version,
});

updateNotifier({
  pkg: packageJson,
  updateCheckInterval: 1000 * 60 * 60, // 1 h
}).notify({ isGlobal: true, defer: true });

exec();

function exec() {
  const cwd = process.cwd();

  welcome();
  const requiredVersion = packageJson.engines.node;
  checkNodeVersion(requiredVersion, packageJson.name);

  /**
   * Usage.
   */
  program.version(packageJson.version).usage('[command] [options]');

  Object.entries(COMMANDS).forEach(([cmdType, { desc, options }]) => {
    let command = program
      .command(cmdType)
      .description(chalk.green(desc));

    if (options) {
      options.forEach(({ name, desc: _desc }) => {
        command = command.option(name, _desc);
      });
    }

    command.action((...args) => {
      optionsAttachToEnv(command);
      dotenv.config({ debug: process.env.DEBUG });
      goldlog(cmdType, {});
      /* eslint-disable-next-line import/no-dynamic-require */
      require(`../lib/${cmdType}`).apply(global, [cwd, ...args]);
    });
  });

  // output help information on unknown commands
  program.parse(process.argv);
  if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(1);
  }

  program.arguments('<command>').action((cmd) => {
    program.outputHelp();
    console.log();
    console.log(`  ${chalk.red(`Unknown command ${chalk.yellow(cmd)}.`)}`);
    console.log();
  });
}

function welcome() {
  boxenLog(`${chalk.green('Welcome to use ice-devtools')}`);
}

/**
 * check node version
 * @param {string} wanted
 * @param {string} id
 */
function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(
      chalk.red(
        `You are using Node ${
          process.version
        }, but this version of ${
          id
        } requires Node ${
          wanted
        }.\nPlease upgrade your Node version.`
      )
    );
    process.exit(1);
  }
}
