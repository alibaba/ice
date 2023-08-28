import type { RecursiveTemplate, UnRecursiveTemplate } from '@ice/shared';
import type { Config, webpack } from '@ice/app/esm/types';

export interface MiniappConfig {
  rootDir: string;
  template: any;
  fileType: any;
  getAppConfig: (exportNamse?: string[]) => Promise<any>;
  getRoutesConfig: (specifyRoutId?: string) => Promise<any>;
}

export interface MiniappComponent {
  name: string;
  path: string;
  isNative: boolean;
  stylePath?: string;
  templatePath?: string;
}

export interface FileType {
  templ: string;
  style: string;
  config: string;
  script: string;
  xs?: string;
}
export interface TargetConfig {
  globalObject: string;
  projectConfigJson?: string;
  fileType: FileType;
  template: RecursiveTemplate | UnRecursiveTemplate;
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
}

export interface MiniappWebpackConfig {
  plugins: Config['plugins'];
  module: webpack.Configuration['module'];
}
