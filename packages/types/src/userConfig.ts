import type { DefineRouteFunction } from '@ice/route-manifest';
import type { IPluginList } from 'build-scripts';
import type { Config, ModifyWebpackConfig } from './config';

export interface UserConfig {
  alias?: Record<string, string | false>;
  define?: Record<string, string | boolean>;
  devPublicPath?: string;
  publicPath?: string;
  hash?: boolean | string;
  externals?: Config['externals'];
  outputDir?: string;
  proxy?: Config['proxy'];
  filename?: string;
  webpack?: ModifyWebpackConfig;
  routes?: {
    ignoreFiles?: string[];
    defineRoutes?: (defineRoute: DefineRouteFunction) => void;
  };
  plugins?: IPluginList;
  dropLogLevel?: 'trace' | 'debug' | 'log' | 'info' | 'warn' | 'error';
  minify?: boolean;
  compileDependencies?: boolean | string[] | RegExp[];
  sourceMap?: string | boolean;
  tsChecker?: boolean;
  eslint?: Config['eslintOptions'] | boolean;
  ssr?: boolean;
  ssg?: boolean;
  removeHistoryDeadCode?: boolean;
  mock?: { exclude?: string[] };
}
