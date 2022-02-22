import type { EntryObject } from 'webpack';

export interface IFrameworkConfig {
  entry?: string | string[] | EntryObject;

  outputDir?: string;

  externals?: Record<string, string | string[]>;

  vendor?: boolean;

  outputAssetsPath?: Record<string, string>;

  sourceMap?: boolean | string;

  publicPath?: string;

  devPublicPath?: string;
}
