import * as path from 'path';
import * as fse from 'fs-extra';
import getCompileDeps from './getCompileDeps';
import preBuild from './preBuild';

interface ICheckFunction {
  (packageName: string): boolean;
}
export type IRule = ICheckFunction | string | RegExp | string[];

export interface IRemoteOptions {
  activeInBuild: boolean;
  include?: IRule;
  exclude?: IRule;
  autoDetect?: boolean;
}

const remoteRuntime = async (api, options: IRemoteOptions) => {
  const { onGetWebpackConfig, context } = api;
  const { pkg, userConfig, webpack, command, rootDir } = context;
  const { activeInBuild, ...rest } = options;

  const activeRemoteRuntime = activeInBuild || command === 'start';
  if (!activeRemoteRuntime) {
    return;
  }
  const cacheDir = path.join(rootDir, 'node_modules', '.cache', 'runtime');
  const cacheFile = path.join(cacheDir, 'cache.json');
  const runtimeDir = path.join(cacheDir, 'remoteRuntime');

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
    preBuild(api, { runtimeDir, cacheFile, cacheDir, cacheContent });
  }

  // modify userConfig


};