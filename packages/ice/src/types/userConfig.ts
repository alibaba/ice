import type { DefineRouteFunction } from '@ice/route-manifest';
import type { PluginList } from 'build-scripts';
import type { UnpluginOptions } from '@ice/bundles/compiled/unplugin/index.js';
import type { Config, ModifyWebpackConfig, MinimizerOptions } from '@ice/webpack-config/esm/types';
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

export interface UserConfig {
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
  routes?: {
    ignoreFiles?: string[];
    defineRoutes?: (defineRoute: DefineRouteFunction) => void;
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
    format?: 'esm' | 'cjs';
    bundle?: boolean;
    ignores?: IgnorePattern[];
  };
  optimization?: Optimization;
  mock?: { exclude?: string[] };
  experimental?: Config['experimental'];
  transform?: UnpluginOptions['transform'];
  syntaxFeatures?: SyntaxFeatures;
  splitChunks?: boolean;
  dataLoader?: boolean;
  crossOriginLoading?: Config['output']['crossOriginLoading'];
}
