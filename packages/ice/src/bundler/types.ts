import type { TaskConfig } from 'build-scripts';
import type { Config } from '@ice/webpack-config/types';
import type ora from '@ice/bundles/compiled/ora/index.js';
import type { Stats } from '@ice/bundles/compiled/webpack/index.js';
import type { AppConfig } from '@ice/runtime/types';
import type { ServerCompiler, GetAppConfig, GetRoutesConfig, GetDataloaderConfig } from '../types/plugin.js';
import type { UserConfig } from '../types/userConfig.js';
import type RouteManifest from '../utils/routeManifest.js';
import type ServerRunner from '../service/ServerRunner.js';

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
  stats: Stats;
  isSuccessful: boolean;
  messages: { errors: string[]; warnings: string[] };
};
