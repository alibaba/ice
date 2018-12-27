#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');
const semver = require('semver');
const packageJson = require('../package.json');
const COMMANDS = require('../config/commands');

const cwd = process.cwd();

/**
 * check node version
 * @param {string} wanted
 * @param {string} id
 */
function checkNodeVersion(wanted, id) {
  if (!semver.satisfies(process.version, wanted)) {
    console.log(
      chalk.red(
        'You are using Node ' +
          process.version +
          ', but this version of ' +
          id +
          ' requires Node ' +
          wanted +
          '.\nPlease upgrade your Node version.'
      )
    );
    process.exit(1);
  }
}

const requiredVersion = packageJson.engines.node;
checkNodeVersion(requiredVersion, packageJson.name);

/**
 * Usage.
 */
program.version(packageJson.version).usage('[command] [options]');

Object.entries(COMMANDS).forEach((entry) => {
  let command = program
    .command(entry[0])
    .description(chalk.green(entry[1].desc));

  entry[1].options &&
    entry[1].options.forEach((opt) => {
      command = command.option(opt.name, opt.desc);
    });

  command.action(function() {
    const fn = require(`../lib/${entry[0]}`);
    const args = [cwd].concat(Array.prototype.slice.call(arguments));
    fn.apply(global, args);
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
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
  console.log();
});
