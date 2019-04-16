const { realpathSync } = require('fs');
const { resolve } = require('path');
const url = require('url');

const pkgData = require('../config/packageJson');
const cliInstance = require('../utils/cliInstance');

function resolveSDK(relativePath) {
  return resolve(__dirname, relativePath);
}

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  }
  return path;
}

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
function getPublicPath(appPackageJson) {
  let publicPath;

  // eslint-disable-next-line
  const appPackage = require(appPackageJson);
  const buildConfig = appPackage.buildConfig || {};

  // 定制逻辑
  if (buildConfig.localization) {
    publicPath = './';
  }

  // 兼容逻辑： buildConfig 自定义 publicURL/publicUrl？
  if (buildConfig.publicURL || buildConfig.publicUrl) {
    publicPath = url.parse(buildConfig.publicURL || buildConfig.publicUrl).pathname;
  }

  // buildConfig 自定义 output.publicPath
  if (buildConfig.output && buildConfig.output.publicPath) {
    publicPath = buildConfig.output.publicPath;
  }

  // 默认 '/'
  publicPath = publicPath || '/';

  return ensureSlash(publicPath, true);
}

const appDirectory = realpathSync(process.cwd());

function resolveApp(relativePath) {
  return resolve(appDirectory, relativePath);
}

const isOldKoa = cliInstance.get('projectType') === 'node';

function getAppHtmlPath() {
  let relativePath = '';
  if (isOldKoa) {
    relativePath = 'client/index.html';
  } else if (pkgData.type === 'block') {
    relativePath = 'demo/index.html';
  } else {
    relativePath = 'public/index.html';
  }
  return resolveApp(relativePath);
}

module.exports = {
  appBuild: resolveApp('build'),
  appPublic: resolveApp('public'),
  appHtml: getAppHtmlPath(),
  appFavicon: isOldKoa ? resolveApp('client/favicon.png') : resolveApp('public/favicon.png'),
  appFaviconIco: isOldKoa ? resolveApp('client/favicon.ico') : resolveApp('public/favicon.ico'),
  appPackageJson: resolveApp('package.json'),
  appAbcJson: resolveApp('abc.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  sdkNodeModules: resolveSDK('../../node_modules'),
  publicPath: getPublicPath(resolveApp('package.json')),
  resolveApp,
  appDirectory,
};
