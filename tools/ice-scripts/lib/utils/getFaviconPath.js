const pathExists = require('path-exists');

module.exports = (favicon) => {
  if (pathExists.sync(favicon)) {
    return favicon;
  }
  return '';
};
