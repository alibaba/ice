import type { DefineRouteFunction } from '@ice/route-manifest';
import type { PluginList } from 'build-scripts';
import type { UnpluginOptions } from 'unplugin';
import type { Config, ModifyWebpackConfig, MinimizerOptions } from './config';
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
    format: 'esm' | 'cjs';
    bundle: boolean;
  };
  optimization?: Optimization;
  mock?: { exclude?: string[] };
  experimental?: Config['experimental'];
  transform?: UnpluginOptions['transform'];
  syntaxFeatures?: SyntaxFeatures;
  splitChunks?: boolean;
}
