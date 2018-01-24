const { realpathSync } = require('fs');
const { resolve } = require('path');
const url = require('url');
const envPublicUrl = process.env.PUBLIC_URL;

function resolveSDK(relativePath) {
  return resolve(__dirname, relativePath);
}

// We use `PUBLIC_URL` environment variable or "buildConfig.publicURL" or
// "homepage" field to infer "public path" at which the app is served.
const getPublicUrl = appPackageJson => {
  if (envPublicUrl) {
    return envPublicUrl;
  }

  const appPackage = require(appPackageJson);
  if (appPackage.buildConfig && appPackage.buildConfig.publicURL || appPackage.buildConfig.publicUrl) {
    return appPackage.buildConfig.publicURL || appPackage.buildConfig.publicUrl;
  }

  if (appPackage.homepage) {
    return appPackage.homepage;
  }

  return '/';
}

function ensureSlash(path, needsSlash) {
  const hasSlash = path.endsWith('/');
  if (hasSlash && !needsSlash) {
    return path.substr(path, path.length - 1);
  } else if (!hasSlash && needsSlash) {
    return `${path}/`;
  } else {
    return path;
  }
}

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson);
  const servedUrl = envPublicUrl || (publicUrl ? url.parse(publicUrl).pathname : '/');
  return ensureSlash(servedUrl, true);
}

module.exports = function getPaths(cwd) {
  const appDirectory = realpathSync(cwd);

  function resolveApp(relativePath) {
    return resolve(appDirectory, relativePath);
  }

  return {
    appBuild: resolveApp('dist'),
    appPublic: resolveApp('public'),
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
