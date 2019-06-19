const semver = require('semver');
const log = require('./log');

module.exports = function checkNodeVersion(requireNodeVersion) {
  if (!semver.satisfies(process.version, requireNodeVersion)) {
    log.error(`You are using Node ${process.version}`);
    log.error(`ice-scripts requires Node ${requireNodeVersion}, please update Node.`);
    process.exit(1);
  }
};
