import { IPluginAPI } from '@alib/build-scripts';

export type Depth = 0 | 1 | 2 | 'major' | 'minor' | 'patch';

export interface Runtime {
  root: string;
  id?: string;
  depth?: Depth;
  version?: string | number;
  url?: string | string[];
}

export type Externals =
  | Record<string, string>
  | {
    [index: string]: Runtime;
  }

export interface Options {
  // runtime?: Runtime[];
  externals?: Externals;
  modules?: Json<string>[];
  minify?: boolean;
  outputDir?: string;
  sourceMap?: boolean;
}

export type PartialPlugin = Partial<IPluginAPI>;

export interface Json<T> {
  [index: string]: T;
}
