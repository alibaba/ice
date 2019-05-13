const { realpathSync } = require('fs');
const { resolve } = require('path');

const pkgData = require('../config/getPackageJson')();

function resolveSDK(relativePath) {
  return resolve(__dirname, relativePath);
}

// TODO: publicPath is dependent on user config.
function getPublicPath() {
  return './';
}

const appDirectory = realpathSync(process.cwd());

function resolveApp(relativePath) {
  return resolve(appDirectory, relativePath);
}

function getAppHtmlPath() {
  let relativePath = '';

  if (pkgData.type === 'block') {
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
  appFavicon: resolveApp('public/favicon.png'),
  appFaviconIco: resolveApp('public/favicon.ico'),
  appPackageJson: resolveApp('package.json'),
  appAbcJson: resolveApp('abc.json'),
  appSrc: resolveApp('src'),
  appNodeModules: resolveApp('node_modules'),
  sdkNodeModules: resolveSDK('../../node_modules'),
  publicPath: getPublicPath(),
  resolveApp,
  appDirectory,
};
