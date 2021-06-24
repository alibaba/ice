import * as path from 'path';
import * as fse from 'fs-extra';
import { IPlugin, Json } from '@alib/build-scripts';
import getCompileDeps, { IFilterOptions, IRule } from './filterPackages';
import remoteConfig from './remoteConfig';
import preBuild from './preBuild';
import getCacheContent from './getCacheContent';

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
  const { pkg, userConfig, webpack, command, rootDir } = context;
  const { ModuleFederationPlugin } = (webpack as any).container;

  // only active in development mode
  const activeRemoteRuntime = command === 'start' && remoteRuntime;
  if (activeRemoteRuntime) {
    const cacheDir = path.join(rootDir, 'node_modules', '.cache', 'runtime');
    const cacheFile = path.join(cacheDir, 'cache.json');
    const runtimeDir = path.join(cacheDir, 'remoteRuntime');
    const remoteName = 'remote_runtime';
    const remoteEntry = 'remoteEntry.js';
    let needCompile = false;
    let lastCache = '';

    const pkgDeps = {
      ...(pkg.dependencies as Json || {}),
      ...(pkg.devDependencies as Json || {}),
    };

    // filter dependencies
    const compilePackages = activeRemoteRuntime ? await getCompileDeps(Object.keys(pkgDeps), rootDir, typeof remoteRuntime !== 'boolean' ? remoteRuntime : {}) : [];
    const cacheContent = getCacheContent({ compilePackages, rootDir, userConfig });
    
    try {
      lastCache = fse.readFileSync(cacheFile, 'utf-8');
    } catch(err) {
      // ignore err when read file
    }
    // check deps after remote package
    needCompile = activeRemoteRuntime && lastCache !== cacheContent;
    // ensure folder before compile and copy
    fse.ensureDirSync(runtimeDir);
    remoteConfig(api, { remoteName, runtimeDir, remoteEntry, compilePackages, bootstrap });

    // if mismatch cache compile remote runtime
    if (needCompile) {
      preBuild(api, { runtimeDir, cacheDir, cacheContent, remoteEntry, remoteName, cacheFile, compilePackages });
    }
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
    config.merge({
      ...cacheConfig,
      ...(cacheLog ? {
        infrastructureLogging: {
          debug: typeof cacheLog === 'boolean' ? /FileSystemInfo/ : new RegExp(cacheLog),
        }
      }: {}),
    });
  });
};

export default plugin;