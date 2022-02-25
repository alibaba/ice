// import chalk from 'chalk';
// import semver from 'semver';
const chalk = require('chalk');
const semver = require('semver');

module.exports = function (requireNodeVersion, frameworkName = 'ice') {
  if (!semver.satisfies(process.version, requireNodeVersion)) {
    console.log();
    console.log(chalk.red(`  You are using Node ${process.version}`));
    console.log(chalk.red(`  ${frameworkName} requires Node ${requireNodeVersion}, please update Node.`));
    console.log();
    console.log();
    process.exit(1);
  }
};
