import type { Config } from '@ice/shared-config/types';
import type ora from '@ice/bundles/compiled/ora/index.js';
import type { Stats as WebpackStats } from '@ice/bundles/compiled/webpack/index.js';
import type { AppConfig } from '@ice/runtime-kit';
import type { Configuration, MultiCompiler, MultiStats } from '@rspack/core';
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
  hasDataLoader: boolean;
}

export type CompileResults = {
  stats: WebpackStats | MultiStats;
  isSuccessful: boolean;
  messages: { errors: string[]; warnings: string[] };
};
