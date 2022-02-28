const path = require('path');
const fs = require('fs-extra');

function emptyDir(dir) {
  if (fs.existsSync(dir)) {
    fs.emptyDirSync(dir);
  }
}

module.exports = (...args) => {
  const [/* config */, force, context, api] = args;
  if (force) {
    const { command, userConfig, rootDir } = context;
    const { onHook } = api;
    onHook(`before.${command}.run`, ({ config }) => {
      if (userConfig.vite) {
        // vite 模式缓存目录固定为 /node_modules/.vite
        emptyDir(path.join(rootDir, 'node_modules', '.vite'));
      } else {
        config.forEach((webpackConfig) => {
          if (webpackConfig.cache && webpackConfig.cache.cacheDirectory) {
            emptyDir(webpackConfig.cache.cacheDirectory);
          }
        });
      }
    });
  }
};
