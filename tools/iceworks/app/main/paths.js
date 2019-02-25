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

const NODE_FRAMEWORKS =['koa2', 'midway', 'midwayAli'];

const getClientPath = (destDir, framework, sourcePath = '') => {
  if (framework) {
    if (framework === 'koa') {
      return path.join(destDir, 'client');
    } else if (NODE_FRAMEWORKS.includes(framework)) {
      return path.join(destDir, 'client', sourcePath);
    }
  } else {
    return path.join(destDir, sourcePath);
  }
};

const getServerPath = (destDir, framework) => {
  if (NODE_FRAMEWORKS.includes(framework) || framework === 'koa') {
    return path.join(destDir, 'server');
  }
  return null;
};

const getClientSrcFolder = (framework) => {
  if (framework) {
    if (framework === 'koa') {
      return 'client';
    } else if (NODE_FRAMEWORKS.includes(framework)) {
      return 'src';
    }
  } else {
    return 'src';
  }
};

module.exports = {
  APP_BIN_PATH,
  APP_PATH,
  NPM_CLI,
  SASS_BINARY_PATH,
  NODE_PATH,
  WIN_NPM_CMD,
  NODE_FRAMEWORKS,
  getClientPath,
  getClientSrcFolder,
  getServerPath
};
