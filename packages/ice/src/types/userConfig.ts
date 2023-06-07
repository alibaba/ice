import type { DefineRouteFunction, RouteItem } from '@ice/route-manifest';
import type { PluginList } from 'build-scripts';
import type { UnpluginOptions } from '@ice/bundles/compiled/unplugin/index.js';
import type { ProcessOptions } from '@ice/bundles';
import type { Config, ModifyWebpackConfig, MinimizerOptions } from '@ice/webpack-config/types';
import type { OverwritePluginAPI } from './plugin';

interface SyntaxFeatures {
  // syntax exportDefaultFrom and functionBind is not supported by esbuild
  exportDefaultFrom?: boolean;
  functionBind?: boolean;
}

interface Optimization {
  router?: boolean;
}

interface MinifyOptions {
  type: 'terser' | 'swc';
  options?: MinimizerOptions<Record<string, any>>;
}

interface IgnorePattern {
  resourceRegExp: RegExp;
  contextRegExp?: RegExp;
}

type DistType = 'javascript' | 'html';

interface Fetcher {
  packageName: string;
  method?: string;
}

export interface UserConfig {
  featurePolyfill?: {
    abortcontroller?: boolean | string;
  };
  output?: {
    distType: Array<DistType> | DistType;
    prependCode?: string;
  };
  alias?: Record<string, string | false>;
  define?: Record<string, string | boolean>;
  devPublicPath?: string;
  publicPath?: string;
  hash?: boolean | string;
  externals?: Config['externals'];
  outputDir?: string;
  proxy?: Config['proxy'];
  polyfill?: Config['polyfill'];
  filename?: string;
  webpack?: ModifyWebpackConfig;
  postcss?: ProcessOptions & { plugins?: (string | [string, Record<string, any>?])[] };
  routes?: {
    ignoreFiles?: string[];
    defineRoutes?: (defineRoute: DefineRouteFunction) => void;
    config?: RouteItem[];
    injectInitialEntry?: boolean;
  };
  plugins?: PluginList<Config, OverwritePluginAPI>;
  dropLogLevel?: 'trace' | 'debug' | 'log' | 'info' | 'warn' | 'error';
  minify?: boolean | 'swc' | MinifyOptions;
  compileDependencies?: boolean | string[] | RegExp[];
  sourceMap?: string | boolean;
  tsChecker?: boolean;
  eslint?: Config['eslintOptions'] | boolean;
  ssr?: boolean;
  ssg?: boolean;
  server?: {
    onDemand?: boolean;
    format?: 'esm' | 'cjs';
    bundle?: boolean;
    ignores?: IgnorePattern[];
    externals?: string[];
  };
  optimization?: Optimization;
  mock?: { exclude?: string[] };
  experimental?: Config['experimental'];
  transform?: UnpluginOptions['transform'];
  syntaxFeatures?: SyntaxFeatures;
  /**
   * @deprecated
   * Please use `codeSplitting` instead
   */
  splitChunks?: boolean;
  codeSplitting?: 'page' | 'vendors' | boolean;
  dataLoader?: {
    fetcher?: Fetcher;
  } | Boolean;
  crossOriginLoading?: Config['output']['crossOriginLoading'];
}
