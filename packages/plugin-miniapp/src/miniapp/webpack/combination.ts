import path from 'node:path';
import fs from 'fs-extra';
import { createRouteIdByFile } from '@ice/route-manifest';
import type { MiniappWebpackOptions } from '../../types.js';
import type { IMiniBuildConfig } from './utils/types.js';
import { MiniWebpackPlugin } from './plugin.js';
import { MiniWebpackModule } from './module.js';

export class MiniCombination {
  config: IMiniBuildConfig;
  sourceRoot: string;
  sourceDir: string;

  constructor(public appPath: string, public rawConfig: MiniappWebpackOptions) {
    this.sourceRoot = 'src';
    this.sourceDir = path.resolve(appPath, this.sourceRoot);
    // for mock
    this.config = {
      sourceRoot: this.sourceRoot,
      fileType: rawConfig.fileType,
      env: rawConfig.env,
      template: rawConfig.template,
      modifyBuildAssets: rawConfig.modifyBuildAssets,
      // the follow value is writing for type check, do not make any sense.
      isBuildPlugin: false,
      isBuildNativeComp: false,
      isSupportRecursive: false, // TODO
      platform: 'wechat',
      nodeModulesPath: '',
      isSupportXS: true,
      globalObject: '',
      taroComponentsPath: '',
      mode: 'development',
      buildAdapter: '',
      platformType: 'mini',
      onParseCreateElement: async (nodeName, componentConfig) => {},
      modifyComponentConfig: async () => {},
    };
  }

  process() {
    const webpackPlugin = new MiniWebpackPlugin(this);
    const webpackModule = new MiniWebpackModule(this);

    return {
      plugins: webpackPlugin.getPlugins(),
      module: webpackModule.getModules(),
    };
  }

  async readConfig(configPath: string, appPath: string): Promise<any> {
    const relativePath = path.relative(appPath, configPath);
    const relativePathSegments = relativePath.split(path.sep);
    if (relativePathSegments[0] === '.ice' && relativePathSegments[1] === 'entry.miniapp.config') {
      const { miniappManifest } = await this.rawConfig.configAPI.getAppConfig(['miniappManifest']);
      if (!miniappManifest) {
        throw new Error('缺少 miniappManifest，请检查！');
      }
      const appConfig = {
        ...miniappManifest,
        pages: miniappManifest.routes.map((route) => `pages/${route}`),
        subPackages: miniappManifest.subPackages?.map((subPackage) => ({
          ...subPackage,
          root: `pages/${subPackage.root}`,
        })) ?? [],
      };
      delete appConfig.routes;

      return appConfig;
    } else if (configPath.endsWith('.json')) {
      return await fs.readJSON(configPath);
    } else if (relativePathSegments[0] === 'src' && relativePathSegments[1] === 'pages' && relativePathSegments[relativePathSegments.length - 1].endsWith('.config')) {
      // starts with src/pages and ends with .config
      // for example: src/pages/home/a.config => home/a
      const route = [...relativePathSegments.slice(2, -1), relativePathSegments[relativePathSegments.length - 1].slice(0, -'.config'.length)].join('/');
      const routeId = createRouteIdByFile(`${route}.tsx`);
      const configFn = await this.rawConfig.configAPI.getRoutesConfig(routeId);
      return configFn?.() ?? {};
    }

    throw new Error(`Unknown config file of ${configPath}`);
  }
}
