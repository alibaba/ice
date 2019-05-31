#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const semver = require('semver');
const updater = require('npm-updater');
const packageJson = require('../package.json');
const COMMANDS = require('../config/commands');
const optionsAttachToEnv = require('../utils/options-attach-to-env');
const goldlog = require('../utils/goldlog');

const cwd = process.cwd();

// 统计用户版本
goldlog('version', {
  version: packageJson.version,
});

const tag = 'latest';
const updateMessage = `你可以执行 npm install -g ice-devtools@${tag} 来安装此版本\n`;

// 提醒用户安装最新版本
updater({
  package: packageJson,
  abort: false,
  tag,
  updateMessage,
  interval: '1d',
}).catch(() => {
}).then(exec);

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

function exec() {
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
