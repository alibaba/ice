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
}
