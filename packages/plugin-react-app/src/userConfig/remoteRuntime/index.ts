import * as path from 'path';
import * as fse from 'fs-extra';
import getCompileDeps from './getCompileDeps';
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

const remoteRuntime = async (api, options: IRemoteOptions|boolean) => {
  const { context } = api;
  const { pkg, command, rootDir } = context;
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

  const compilePackages = await getCompileDeps(pkg.dependencies, rootDir, rest);

  // TODO cache compile packages with version and userConfig

  let lastCache = {};
  try {
    lastCache = fse.readJSONSync(cacheFile);
  } catch(err) {
    // ignore err when read json
  }
  const cacheContent = JSON.stringify(compilePackages);
  const needPreBuild = JSON.stringify(lastCache) !== cacheContent;

  if (needPreBuild) {
    preBuild(api, { remoteName, remoteEntry, runtimeDir, cacheFile, cacheDir, cacheContent, compilePackages });
  }

  // modify webpack config for main app
  configApp(api, { remoteName, bootstrap, compilePackages, remoteEntry, runtimeDir});
};

export default remoteRuntime;