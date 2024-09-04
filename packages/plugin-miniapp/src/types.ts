import type { RecursiveTemplate, UnRecursiveTemplate } from '@ice/shared';
import type { Config, webpack } from '@ice/app/esm/types';
import type { IFileType, IMiniBuildConfig } from './miniapp/webpack/utils/types.js';

export interface TargetConfig {
  globalObject: string;
  projectConfigJson?: string;
  fileType: IFileType;
  template: RecursiveTemplate | UnRecursiveTemplate;
  modifyBuildAssets?: IMiniBuildConfig['modifyBuildAssets'];
  components: Record<string, Record<string, string>>;
}

export interface MiniappWebpackOptions {
  rootDir: string;
  env?: Record<string, string>;
  template: TargetConfig['template'];
  fileType: TargetConfig['fileType'];
  configAPI: {
    getAppConfig: Config['getAppConfig'];
    getRoutesConfig: Config['getRoutesConfig'];
  };
  projectConfigJson?: string;
  nativeConfig: Record<string, any>;
  modifyBuildAssets?: IMiniBuildConfig['modifyBuildAssets'];
}

export interface MiniappWebpackConfig {
  plugins: Config['plugins'];
  module: webpack.Configuration['module'];
}
