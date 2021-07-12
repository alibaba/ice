const path = require('path');

// built-in webpack 5 abilities
module.exports = (api) => {
  const { onGetWebpackConfig, context } = api;
  const { userConfig, rootDir, webpack } = context;
  // filesystem cache
  onGetWebpackConfig((config) => {
    // filesystem cache
    if (!process.env.DISABLE_FS_CACHE) {
      const version = process.env.__FRAMEWORK_VERSION__;
      const cacheConfig = {
        cache: {
          type: 'filesystem',
          version,
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
    // BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
    // This is no longer the case. Verify if you need these module and configure a polyfill for it.
    config.resolve.alias.set('path', 'path-browserify');
    // set alias for webpack/hot while webpack has been prepacked
    config.resolve.alias.set('webpack/hot', '@builder/pack/deps/webpack/hot');
    config.plugin('ProvidePlugin').use(webpack.ProvidePlugin, [{ process: 'process/browser'}]);
    // assetModuleFilename: 'assets/[hash][ext][query]',
    config.output.merge({
      assetModuleFilename: 'assets/[hash][ext][query]',
    });
  });
};
