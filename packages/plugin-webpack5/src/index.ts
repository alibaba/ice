import * as path from 'path';
import * as fse from 'fs-extra';
import * as TerserPlugin from 'terser-webpack-plugin';
import { IPlugin, Json } from '@alib/build-scripts';
import analyzeNext from './analyzeNext';
import filterPackages, { IFilterOptions, IRule } from './filterPackages';
import remoteConfig from './remoteConfig';
import compileRemote from './compileRemote';

interface IRemoteOptions extends IFilterOptions {
  activeInBuild: boolean;
  include?: IRule;
  exclude?: IRule;
  autoDetect?: boolean;
  remoteCoreJs?: boolean;
}
interface IOptions {
  remoteRuntime?: boolean | IRemoteOptions;
  bootstrap?: string;
  cacheLog?: boolean | string;
}

const plugin: IPlugin = async (api, options = {}) => {
  const { onGetWebpackConfig, registerUserConfig, context } = api;
  const { remoteRuntime, bootstrap, cacheLog } = options as IOptions;
  const { pkg, userConfig, webpack, command } = context;
  const { ModuleFederationPlugin } = (webpack as any).container;

  // only active in development mode
  const activeRemoteRuntime = command === 'start' && remoteRuntime;

  const cacheFolder = path.join(context.rootDir, 'node_modules', '.cache', 'runtime');
  const depsPath = path.join(cacheFolder, 'deps.json');
  const runtimeFolder = path.join(cacheFolder, 'remoteRuntime');
  const remoteName = 'remote_runtime';
  const remoteEntry = 'remoteEntry.js';
  const injectBundles = [];

  const pkgDeps = {
    ...(pkg.dependencies as Json || {}),
    ...(pkg.devDependencies as Json || {}),
  };

  // external react and react-dom in case of cause error when bundle multi instance
  const externalMap = {
    react: 'React',
    'react-dom': 'ReactDOM',
  };
  const externals = [];
  if (userConfig?.externals) {
    externals.push(userConfig.externals);
  }
  if (!(userConfig?.externals as Json)?.react) {
    externals.push(externalMap);
  }
  // filter dependencies
  let compileKeys = activeRemoteRuntime ? await filterPackages(Object.keys(pkgDeps), context.rootDir, typeof remoteRuntime !== 'boolean' ? remoteRuntime : {}) : [];
  let needCompile = false;

  if (activeRemoteRuntime) {
    let cssPath = '';
    // read pkgDep from cache
    let cacheContent = {};
    try {
      cacheContent = fse.readJSONSync(depsPath);
    } catch(err) {
      // ignore err
    }
    if (pkgDeps['@alifd/next']) {
      // check @alifd/next
      const [nextCSS, removePackage] = analyzeNext(userConfig, context.rootDir);
      cssPath = nextCSS;
      if (removePackage) {
        // compile next
        delete pkgDeps[removePackage];
        compileKeys = compileKeys.filter(compileKey => compileKey !== removePackage);
      }
    }
    // check deps after remote package
    needCompile = activeRemoteRuntime && JSON.stringify(compileKeys) !== JSON.stringify(cacheContent);
    // ensure folder before compile and copy
    fse.ensureDirSync(runtimeFolder);
    const externalBundles = [
      ['react.js', require.resolve('react/umd/react.development.js')],
      ['react-dom.js', require.resolve('react-dom/umd/react-dom.development.js')],
      ...(cssPath ? [['next.css' ,cssPath]]: []),
    ];
    injectBundles.push(`/remoteRuntime/${remoteEntry}`);
    // copy external bundles
    externalBundles.forEach(([fileName, filePath]) => {
      fse.copyFileSync(filePath, path.join(runtimeFolder, fileName));
      injectBundles.push(`/remoteRuntime/${fileName}`);
    });
    remoteConfig(api, { remoteName, runtimeFolder, injectBundles, externals, compileKeys, bootstrap });
  }
  // if missmatch cache compile remote runtime
  if (needCompile) {
    compileRemote(api, { runtimeFolder, cacheFolder, externals, remoteEntry, remoteName, depsPath, compileKeys });
  }

  registerUserConfig({
    name: 'moduleFederation',
    validation: 'object',
    async configWebpack(config, value) {
      config.plugin('ModuleFederationPlugin').use(ModuleFederationPlugin, [value]);
    },
  });

  onGetWebpackConfig((config) => {
    // compatible with process
    config
      .plugin('DefinePlugin')
      // @ts-ignore
      .tap(([args]) => [{ 
        process: JSON.stringify({}),
        'process.env': JSON.stringify({}),
        ...args,
      }]);

    // BREAKING CHANGE: webpack < 5 used to include polyfills for node.js core modules by default.
    // This is no longer the case. Verify if you need these module and configure a polyfill for it.
    config.resolve.alias.set('path', 'path-browserify');

    // remove CaseSensitivePathsPlugin which do not compatible with webpack 5
    config.plugins.delete('CaseSensitivePathsPlugin');

    // filesystem cache
    const cacheConfig = {
      cache: {
        type: 'filesystem',
        buildDependencies: {},
        cacheDirectory: path.join(context.rootDir, 'node_modules', '.cache', 'webpack'),
      }
    };

    // tnpm / cnpm 安装时，webpack 5 的持久缓存无法生成，长时间将导致 OOM
    // 原因：[managedPaths](https://webpack.js.org/configuration/other-options/#managedpaths) 在 tnpm / cnpm 安装的情况下失效，导致持久缓存在处理 node_modules
    // 通过指定 [immutablePaths](https://webpack.js.org/configuration/other-options/#immutablepaths) 进行兼容
    // 依赖路径中同时包含包名和版本号即可满足 immutablePaths 的使用

    // 通过安装后的 package.json 中是否包含 __npminstall_done 字段来判断是否为 tnpm / cnpm 安装模式
    // eslint-disable-next-line global-require
    if (require('../package.json').__npminstall_done) {
      const nodeModulesPath = path.join(context.rootDir, 'node_modules');
      (cacheConfig as any).snapshot = {
        immutablePaths: [nodeModulesPath],
      };
    }

    config.merge({
      ...cacheConfig,
      ...(cacheLog ? {
        infrastructureLogging: {
          debug: typeof cacheLog === 'boolean' ? /FileSystemInfo/ : new RegExp(cacheLog),
        }
      }: {}),
    });

    // compatibility cache feature with webpack@5 of webpack-terser-plugin
    if((config as any).optimization.minimizers.has('TerserPlugin')) {
      const pluginConfig = { ...config.optimization.minimizer('TerserPlugin').get('args')[0] };
      (config as any).optimization.minimizers.delete('TerserPlugin');
      config.optimization.minimizer('TerserPlugin')
        .use(TerserPlugin, [pluginConfig]);
    }
  });
};

export default plugin;