import * as path from 'path';
import * as fse from 'fs-extra';
import type { IPluginAPI } from 'build-scripts';
import getCompileDeps from './getCompileDeps';
import getCacheContent from './getCacheContent';
import preBuild from './preBuild';
import configApp from './configApp';

interface ICheckFunction {
  (packageName: string): boolean;
}
export type IRule = ICheckFunction | string | RegExp | string[];

export interface IRemoteOptions {
  activeInBuild: boolean;
  include?: IRule;
  exclude?: IRule;
  autoDetect?: boolean;
  bootstrap?: string;
}

const remoteRuntime = async (api: IPluginAPI, options: IRemoteOptions|boolean) => {
  const { context } = api;
  const { pkg, command, rootDir, userConfig } = context;
  const { activeInBuild = false, bootstrap = '', ...rest } = typeof options === 'boolean' ? {} : options;

  const activeRemoteRuntime = activeInBuild || command === 'start';
  if (!activeRemoteRuntime) {
    return;
  }
  const cacheDir = path.join(rootDir, 'node_modules', '.cache', 'runtime');
  const cacheFile = path.join(cacheDir, 'cache.json');
  const runtimeDir = path.join(cacheDir, 'remoteRuntime');
  const remoteName = 'remote_runtime';
  const remoteEntry = 'remoteEntry.js';
  const packageKeys = Object.keys(pkg.dependencies || {});
  const compilePackages = (await getCompileDeps(packageKeys, rootDir, rest)).filter((compilePackage: string) => {
    const hasExternal = userConfig?.externals && userConfig.externals[compilePackage];
    // filter package when config as external dependencies
    return !hasExternal;
  });

  // ensure cache dir
  fse.ensureDirSync(cacheDir);

  let lastCache = '';
  try {
    lastCache = fse.readFileSync(cacheFile, 'utf-8');
  } catch(err) {
    // ignore err when read file
  }
  const cacheContent = getCacheContent({ compilePackages, rootDir, userConfig });
  const needPreBuild = lastCache !== cacheContent;
  if (needPreBuild) {
    preBuild(api, { remoteName, remoteEntry, runtimeDir, cacheFile, cacheDir, cacheContent, compilePackages });
  }
  // modify webpack config for main app
  configApp(api, { remoteName, bootstrap, compilePackages, remoteEntry, runtimeDir});
};

export default remoteRuntime;