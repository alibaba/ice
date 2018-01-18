const { realpathSync } = require('fs');
const { resolve } = require('path');

function resolveSDK(relativePath) {
  return resolve(__dirname, relativePath);
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
    resolveApp,
    appDirectory
  };
};
