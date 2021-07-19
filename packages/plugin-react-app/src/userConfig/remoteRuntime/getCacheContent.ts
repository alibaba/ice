import * as path from 'path';
import * as fse from 'fs-extra';
import type { IUserConfig } from 'build-scripts';

interface ICacheOptions {
  compilePackages: string[];
  rootDir: string;
  userConfig: IUserConfig;
}

function getCacheContent(options: ICacheOptions) {
  const { compilePackages, rootDir, userConfig } = options;
  const cacheKeyOfUserConfig = [
    'plugins',
    'alias',
    'compileDependencies',
    'cssLoaderOptions',
    'define',
    'externals',
    'lessLoaderOptions',
    'postcssOptions',
    'sassLoaderOptions',
    'webpackLoaders',
    'webpackPlugins'
  ];
  const cacheConfig = cacheKeyOfUserConfig.reduce((prev, current) => {
    if (Object.prototype.hasOwnProperty.call(userConfig, current)) {
      prev.push(`${current}: ${JSON.stringify(userConfig[current])}`);
    }
    return prev;
  }, []);
  const cachePackages = compilePackages.sort().map((packageName) => {
    try {
      const packageJson = fse.readJSONSync(require.resolve(path.join(packageName, 'package.json'), { paths: [rootDir]}));
      return `${packageName}: ${packageJson.version}`;
    } catch(err) {
      return `${packageName}: false`;
    }
  });
  return JSON.stringify({ config: cacheConfig, packages: cachePackages });
}

export default getCacheContent;