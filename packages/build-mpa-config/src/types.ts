export interface IGeneratorOptions {
  targetDir: string;
  entryName: string;
  pageEntry: string;
  framework: FrameworkType;
  pageConfig?: any;
}

export interface IGenerateResult {
  entryPath: string;
  runAppPath: string;
  routesFilePath: string | undefined;
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
