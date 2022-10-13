import type { RecursiveTemplate, UnRecursiveTemplate } from '@ice/shared';
import type { Configuration } from 'webpack';
import type { Config } from '@ice/types';

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
export interface PlatformConfig {
  globalObject: string;
  projectConfigJson?: string;
  fileType: FileType;
  template: RecursiveTemplate | UnRecursiveTemplate;
}

export interface MiniappWebpackOptions {
  rootDir: string;
  env?: Record<string, string>;
  template: PlatformConfig['template'];
  fileType: PlatformConfig['fileType'];
  configAPI: {
    getAppConfig: Config['getAppConfig'];
    getRoutesConfig: Config['getRoutesConfig'];
  };
}

export type MiniappWebpackConfig = Pick<Configuration, 'plugins' | 'module'>;
