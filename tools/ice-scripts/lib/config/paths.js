const { realpathSync } = require('fs');
const { resolve } = require('path');
const url = require('url');
const pathExists = require('path-exists');

function resolveSDK(relativePath) {
  return resolve(__dirname, relativePath);
}

// We use "buildConfig.publicURL" at which the app is served.
const getPublicUrl = (appPackageJson) => {
  // eslint-disable-next-line
  const appPackage = require(appPackageJson);
  const buildConfig = appPackage.buildConfig || {};
  if (buildConfig && (buildConfig.publicURL || buildConfig.publicUrl)) {
    return buildConfig.publicURL || buildConfig.publicUrl;
  }
  if (buildConfig.localization) {
    return './';
  }
  // 默认值为相对于当前域名绝对路径
  return '/';
};

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
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = publicUrl ? url.parse(publicUrl).pathname : '/';
  return ensureSlash(servedUrl, true);
}

module.exports = function getPaths(cwd) {
  const appDirectory = realpathSync(cwd);

  function resolveApp(relativePath) {
    return resolve(appDirectory, relativePath);
  }

  return {
    appBuild: resolveApp('build'),
    appPublic: resolveApp('public'),
    appHtml: resolveApp('public/index.html'),
    appFavicon: resolveApp('public/favicon.png'),
    appFaviconIco: resolveApp('public/favicon.ico'),
    appPackageJson: resolveApp('package.json'),
    appAbcJson: resolveApp('abc.json'),
    appSrc: resolveApp('src'),
    appNodeModules: resolveApp('node_modules'),
    sdkNodeModules: resolveSDK('../../node_modules'),
    publicUrl: getPublicUrl(resolveApp('package.json')),
    servedPath: getServedPath(resolveApp('package.json')),
    resolveApp,
    appDirectory,
  };
};
