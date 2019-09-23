const path = require('path');
const userHome = require('user-home');

module.exports = {
  DB_PATH: 'build/materials.json',
  TEMP_PATH: path.join(process.cwd(), '.iceworks-tmp'),
  CONFIG_PATH: path.join(userHome || __dirname, '.iceworks/cli-config.json'),
  TOKEN_KEY: 'fusion-token',
  TOKEN_ALI_KEY: 'fusion-token-ali',
};
