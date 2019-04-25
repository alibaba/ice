/* eslint prefer-template:0 */
const request = require('request');
const semver = require('semver');
const chalk = require('chalk');
const packageConfig = require('../package.json');

module.exports = () => {
  if (!semver.satisfies(process.version, packageConfig.engines.node)) {
    console.log();
    console.log(
      chalk.red(
        `You must upgrade node to ${packageConfig.engines.node} to use iceworks`
      )
    );
    console.log();
    return;
  }

  request(
    {
      url: 'https://registry.npmjs.org/iceworks',
      timeout: 1000,
    },
    (err, res, body) => {
      if (!err && res.statusCode === 200) {
        const latestVersion = JSON.parse(body)['dist-tags'].latest;
        const localVersion = packageConfig.version;
        if (semver.lt(localVersion, latestVersion)) {
          console.log(
            chalk.yellow('  A newer version of iceworks is available.')
          );
          console.log();
          console.log('  latest:    ' + chalk.green(latestVersion));
          console.log('  installed: ' + chalk.red(localVersion));
          console.log();
        }
      }
    }
  );
};
