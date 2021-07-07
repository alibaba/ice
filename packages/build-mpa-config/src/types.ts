export interface IGeneratorOptions {
  targetDir: string;
  entryName: string;
  pageEntry: string;
  framework: FrameworkType;
  pageConfig?: any;
}

export type FrameworkType = 'rax' | 'react';
