const fs = require('fs');
const path = require('path');
const userHome = require('user-home');

module.exports = function getConfigPath() {
  const CONFIG_PATH = path.join(userHome, '.idev');
  if (!fs.existsSync(CONFIG_PATH)) {
    fs.mkdirSync(CONFIG_PATH);
  }
  return CONFIG_PATH;
};
