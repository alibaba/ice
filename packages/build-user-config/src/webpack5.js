const path = require('path');
const hash = require('object-hash');

// built-in webpack 5 abilities
module.exports = (config, api) => {
  const { context, getValue } = api;
  const { userConfig, rootDir, webpack } = context;
  // filesystem cache
  if (!process.env.DISABLE_FS_CACHE) {
    const version = getValue('WEBPACK_CACHE_ID') || hash(userConfig);
    const cacheConfig = {
      cache: {
        type: 'filesystem',
        version,
        buildDependencies: {config: [path.join(rootDir, 'package.json')]},
        cacheDirectory: path.join(rootDir, 'node_modules', '.cache', 'webpack'),
      }
    };
    // tnpm / cnpm 安装时，webpack 5 的持久缓存无法生成，长时间将导致 OOM
    // 原因：[managedPaths](https://webpack.js.org/configuration/other-options/#managedpaths) 在 tnpm / cnpm 安装的情况下失效，导致持久缓存在处理 node_modules
    // 通过指定 [immutablePaths](https://webpack.js.org/configuration/other-options/#immutablepaths) 进行兼容
    // 依赖路径中同时包含包名和版本号即可满足 immutablePaths 的使用

    // 通过安装后的 package.json 中是否包含 __npminstall_done 字段来判断是否为 tnpm / cnpm 安装模式
    // eslint-disable-next-line global-require
    if (require('../package.json').__npminstall_done) {
      const nodeModulesPath = path.join(rootDir, 'node_modules');
      cacheConfig.snapshot = {
        immutablePaths: [nodeModulesPath],
      };
    }
    const defaultLogging = {
      level: 'warn',
    };
    config.merge({
      ...cacheConfig,
      ...(userConfig.logging ? {
        // 缓存日志
        infrastructureLogging: {
          ...defaultLogging,
          ...userConfig.logging,
        }
      }: { infrastructureLogging : defaultLogging }),
    });
  }
  // BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
  // This is no longer the case. Verify if you need these module and configure a polyfill for it.
  config.resolve.alias.set('path', 'path-browserify');

  config.resolve.merge({
    fallback: {
      url: '@builder/pack/deps/url'
    },
  });

  config.plugin('ProvidePlugin').use(webpack.ProvidePlugin, [{ process: 'process/browser'}]);
  // assetModuleFilename: 'assets/[hash][ext][query]',
  config.output.merge({
    assetModuleFilename: 'assets/[hash][ext][query]',
  });
};
