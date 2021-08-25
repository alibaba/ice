import type { UserConfig as ViteUserConfig } from 'vite';
import type { BaseUserConfig } from './base';

interface LibraryCustomUmdCommentObject {
  amd?: string;
  commonjs?: string;
  commonjs2?: string;
  root?: string;
}

interface LibraryCustomUmdObject {
  amd?: string;
  commonjs?: string;
  root?: string | string[];
}

interface LibraryOptions {
  auxiliaryComment?: string | LibraryCustomUmdCommentObject;
  export?: string | string[];
  name?: string | string[] | LibraryCustomUmdObject;
  type: string;
  umdNamedDefine?: boolean;
}

interface ExposesConfig {
  import: string | string[];
  name?: string;
}

interface ExposesObject {
  [index: string]: string | ExposesConfig | string[];
}

interface RemotesConfig {
  external: string | string[];
  shareScope?: string;
}

interface RemotesObject {
  [index: string]: string | RemotesConfig | string[];
}

interface SharedConfig {
  eager?: boolean;
  import?: string | false;
  packageName?: string;
  requiredVersion?: string | false;
  shareKey?: string;
  shareScope?: string;
  singleton?: boolean;
  strictVersion?: boolean;
  version?: string | false;
}

declare interface SharedObject {
  [index: string]: string | SharedConfig;
}

interface ModuleFederationPluginOptions {
  exposes?: (string | ExposesObject)[] | ExposesObject;
  filename?: string;
  library?: LibraryOptions;
  name?: string;
  remoteType?:
  | 'var'
  | 'module'
  | 'assign'
  | 'this'
  | 'window'
  | 'self'
  | 'global'
  | 'commonjs'
  | 'commonjs2'
  | 'commonjs-module'
  | 'amd'
  | 'amd-require'
  | 'umd'
  | 'umd2'
  | 'jsonp'
  | 'system'
  | 'promise'
  | 'import'
  | 'script'
  | 'node-commonjs';

  remotes?: (string | RemotesObject)[] | RemotesObject;
  runtime?: string | false;
  shareScope?: string;
  shared?: (string | SharedObject)[] | SharedObject;
}

type FilterItemTypes = string | RegExp | ((value: string) => boolean);

interface InfrastructureLogging {
  appendOnly?: boolean;
  colors?: boolean;
  console?: Console;
  debug?: string | boolean | RegExp | FilterItemTypes[] | ((value: string) => boolean);
  level?: 'none' | 'verbose' | 'error' | 'warn' | 'info' | 'log';
  stream?: NodeJS.WritableStream;
}

type FilterRule = (packageName: string) => boolean | string | RegExp | string[];

interface RemoteOptions {
  activeInBuild?: boolean;
  include?: FilterRule;
  exclude?: FilterRule;
  autoDetect?: boolean;
  bootstrap?: string;
}

export interface UserConfig extends BaseUserConfig {
  vite?: boolean | Omit<ViteUserConfig, 'root'|'base'|'mode'>;
  entry?: string | string[] | Record<string, string | string[]>;
  ignoreHtmlTemplate?: boolean;
  fastRefresh?: boolean;
  remoteRuntime?: false | RemoteOptions;
  moduleFederation?: false | ModuleFederationPluginOptions;
  logging?: InfrastructureLogging;
}

export { BaseUserConfig };