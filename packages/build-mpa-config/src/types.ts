import type RaxGenerator from './generate/RaxGenerator';
import type ReactGenerator from './generate/ReactGenerator';

export interface IGeneratorOptions {
  targetDir: string;
  entryName: string;
  pageEntry: string;
  framework: FrameworkType;
  pageConfig?: any;
  isAppEntry: boolean;
}

export interface IGenerateResult {
  entryPath: string;
  runAppPath: string;
  routesFilePath: string | undefined;
  generator?: RaxGenerator | ReactGenerator;
  generateTasks?: (() => void)[];
}

export type FrameworkType = 'rax' | 'react';

export interface IRunAppRenderData {
  tabBarPath?: undefined | string;
  globalStyle?: undefined | string;
  relativeCorePath?: string;
  typesPath?: string;
  buildConfig?: {
    router: boolean,
  };
  errorBoundary?: boolean;
  pageConfig?: any;
  entryName?: string;
}
