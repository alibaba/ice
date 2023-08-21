import type { Config } from '@ice/shared-config/types';
import type ora from '@ice/bundles/compiled/ora/index.js';
import type { Stats as WebpackStats } from '@ice/bundles/compiled/webpack/index.js';
import type { AppConfig } from '@ice/runtime/types';
import type { Configuration, MultiCompiler } from '@rspack/core';
import type { Context as DefaultContext, TaskConfig } from 'build-scripts';
import type { ServerCompiler, GetAppConfig, GetRoutesConfig, GetDataloaderConfig, ExtendsPluginAPI } from '../types/plugin.js';
import type { UserConfig } from '../types/userConfig.js';
import type RouteManifest from '../utils/routeManifest.js';
import type ServerRunner from '../service/ServerRunner.js';

export type Context = DefaultContext<Config, ExtendsPluginAPI>;

export interface BuildOptions {
  context: Context;
  rspackConfigs: Configuration[];
  routeManifest: BundlerOptions['routeManifest'];
  compiler: MultiCompiler;
  appConfig: BundlerOptions['appConfig'];
  hooksAPI: BundlerOptions['hooksAPI'];
  taskConfigs: BundlerOptions['taskConfigs'];
}

export interface BundlerOptions {
  taskConfigs: TaskConfig<Config>[];
  spinner: ora.Ora;
  hooksAPI: {
    serverCompiler: ServerCompiler;
    getAppConfig: GetAppConfig;
    getRoutesConfig: GetRoutesConfig;
    getDataloaderConfig: GetDataloaderConfig;
    /**
     * Only for dev
     */
    serverRunner?: ServerRunner;
  };
  appConfig: AppConfig;
  configFile: string;
  userConfig: UserConfig;
  routeManifest: RouteManifest;
}

export type CompileResults = {
  stats: WebpackStats | MultiStats;
  isSuccessful: boolean;
  messages: { errors: string[]; warnings: string[] };
};

interface StatsOptionsObj {
  all?: boolean;
  preset?: 'normal' | 'none' | 'verbose' | 'errors-only' | 'errors-warnings';
  assets?: boolean;
  chunks?: boolean;
  modules?: boolean;
  entrypoints?: boolean;
  warnings?: boolean;
  warningsCount?: boolean;
  errors?: boolean;
  errorsCount?: boolean;
  colors?: boolean;
  timings?: boolean;

  /** Rspack not support below opts */
  cachedAssets?: boolean;
  groupAssetsByInfo?: boolean;
  groupAssetsByPath?: boolean;
  groupAssetsByChunk?: boolean;
  groupAssetsByExtension?: boolean;
  groupAssetsByEmitStatus?: boolean;
}

/** webpack not support boolean or string */
type StatsOptions = StatsOptionsObj;

interface StatsAssetInfo {
  development?: boolean;
}

export interface StatsAsset {
  type: string;
  name: string;
  size: number;
  chunks?: Array<string | number>;
  chunkNames?: Array<string | number>;
  info: StatsAssetInfo;
}

interface StatsError {
  message: string;
  formatted?: string;
}

interface StatsModule {
  type?: string;
  moduleType?: string;
  identifier?: string;
  name?: string;
  id?: string;
  chunks?: Array<string>;
  size?: number;
}

interface StatsCompilation {
  assets?: Array<StatsAsset>;
  modules?: Array<StatsModule>;
  chunks?: Array<StatsChunk>;
  // entrypoints?: Array<StatsEntrypoint>;
  errors?: Array<StatsError>;
  errorsCount?: number;
  warnings?: Array<StatsError>;
  warningsCount?: number;
  time?: number;
  name?: string;
  children?: StatsCompilation[];
}

interface StatsChunk {
  type?: string;
  files?: Array<string>;
  id?: string | number;
  entry: boolean;
  initial: boolean;
  names?: Array<string>;
  size: number;
}

export declare class Stats {
  constructor(statsJson: any);
  hasErrors(): boolean;
  hasWarnings(): boolean;
  toJson(opts?: StatsOptions): StatsCompilation;
  toString(opts?: StatsOptions): string;
}

export declare class MultiStats {
  stats: Stats[];
  hasErrors(): boolean;
  hasWarnings(): boolean;
  toJson(options?: StatsOptions): StatsCompilation;
  toString(options?: StatsOptions): string;
}

