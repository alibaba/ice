import { IPluginAPI } from 'build-scripts';

type ExternalsObjectElement = Record<'root' | 'amd' | 'commonjs' | 'commonjs2', string>;

export type Depth = 0 | 1 | 2 | 'major' | 'minor' | 'patch';

export interface Runtime extends Partial<ExternalsObjectElement> {
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
  moduleExternals?: Externals;
  modules?: Json<string>[];
  minify?: boolean;
  outputDir?: string;
  sourceMap?: boolean;
  library?: string;
  filenameStrategy?: string;
}

export type PartialPlugin = Partial<IPluginAPI>;

export interface Json<T> {
  [index: string]: T;
}
