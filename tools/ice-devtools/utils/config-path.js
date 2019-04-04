const fs = require('fs');
const path = require('path');
const userHome = require('user-home');

module.exports = function getConfigPath() {
  // userHome 有可能不存在
  const CONFIG_PATH = path.join(userHome || __dirname, '.idev');
  if (!fs.existsSync(CONFIG_PATH)) {
    fs.mkdirSync(CONFIG_PATH);
  }
  return CONFIG_PATH;
};
