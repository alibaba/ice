const path = require('path');

// built-in webpack 5 abilities
module.exports = (api) => {
  const { onGetWebpackConfig, context } = api;
  const { userConfig, rootDir } = context;
  if (userConfig.webpack5) {
    // filesystem cache
    onGetWebpackConfig((config) => {
      // filesystem cache
      if (!process.env.DISABLE_FS_CACHE) {
        const cacheConfig = {
          cache: {
            type: 'filesystem',
            buildDependencies: {config: [path.join(rootDir, 'package.json')]},
            cacheDirectory: path.join(rootDir, 'node_modules', '.cache', 'webpack'),
          }
        };
        config.merge({
          ...cacheConfig,
          ...(userConfig.cacheLog ? {
            // 缓存日志
            infrastructureLogging: {
              level: 'error',
              debug: typeof cacheLog === 'boolean' ? /FileSystemInfo/ : new RegExp(userConfig.cacheLog),
            }
          }: {}),
        });
      }
      // remove CaseSensitivePathsPlugin which do not compatible with webpack 5
      config.plugins.delete('CaseSensitivePathsPlugin');
      // BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
      // This is no longer the case. Verify if you need these module and configure a polyfill for it.
      config.resolve.merge({
        fallback: {
          path: require.resolve('path-browserify'),
          process: require.resolve('process/browser'),
        }
      });
      // compatible with process
      config
        .plugin('DefinePlugin')
        // @ts-ignore
        .tap(([args]) => [{ 
          process: JSON.stringify({}),
          'process.env': JSON.stringify({}),
          ...args,
        }]);
    });
  }
};
