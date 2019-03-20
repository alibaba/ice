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

const NRM_CLI = path.join(APP_PATH, 'node_modules', 'nrm', 'cli.js');

const SASS_BINARY_PATH = isDev
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

const NODE_FRAMEWORKS = ['koa2', 'midway', 'midwayAli'];

const getClientPath = (destDir, framework) => {
  if (framework && NODE_FRAMEWORKS.includes(framework)) {
    return path.join(destDir, 'client'); 
  } else {
    // 包含两种情况：framework为koa（即老koa项目）、纯前端项目
    return path.join(destDir); 
  }
};

const getServerPath = (destDir, framework) => {
  if (NODE_FRAMEWORKS.includes(framework) || framework === 'koa') {
    return path.join(destDir, 'server');
  }
  return null;
};
/**
 * 前端资源路径 koa: /client; koa2、midway: /client/src; 常规项目: /src
 * @param {*} destDir 项目路径
 * @param {*} framework 项目类型 koa koa2 midway ''
 */
const getClientSrcPath = (destDir, framework) => {
  const clientPath = getClientPath(destDir, framework);
  if (framework && framework === 'koa') {
    return path.join(clientPath, 'client');
  } else {
    return path.join(clientPath, 'src');
  }
};

module.exports = {
  APP_BIN_PATH,
  APP_PATH,
  NPM_CLI,
  NRM_CLI,
  SASS_BINARY_PATH,
  NODE_PATH,
  WIN_NPM_CMD,
  NODE_FRAMEWORKS,
  getClientPath,
  getClientSrcPath,
  getServerPath
};
