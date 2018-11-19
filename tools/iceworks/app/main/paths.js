const is = require('electron-is');
const path = require('path');

const isDev = is.dev();

const APP_PATH = isDev
  ? path.join(process.cwd(), 'app')
  : path.join(process.resourcesPath, 'app');

const APP_BIN_PATH = isDev
  ? path.join(process.cwd(), `bin-${process.platform}`)
  : path.join(process.resourcesPath, 'bin');

const WIN_NPM_CMD = path.join(APP_BIN_PATH, 'npm.cmd');

const NODE_PATH = isDev
  ? path.join(process.cwd(), `bin-${process.platform}`, 'node')
  : path.join(process.resourcesPath, 'bin', 'node');

const NPM_CLI = path.join(APP_PATH, 'node_modules', 'npm', 'bin', 'npm-cli.js');

let SASS_BINARY_PATH = isDev
  ? path.join(
      process.cwd(),
      'binary',
      process.platform,
      'sass',
      `${process.platform}-x64-57_binding.node`
    )
  : path.join(
      process.resourcesPath,
      'binary',
      'sass',
      `${process.platform}-x64-57_binding.node`
    );

const ICELAND_COMPONENTS_PATH = path.join(APP_PATH, 'node_modules', '@ali', 'iceland-components');

module.exports = {
  APP_BIN_PATH,
  APP_PATH,
  NPM_CLI,
  SASS_BINARY_PATH,
  NODE_PATH,
  WIN_NPM_CMD,
  ICELAND_COMPONENTS_PATH
};
