import type webpack from 'webpack';
import type { RuleSetRule, Configuration, Compiler, WebpackPluginInstance } from 'webpack';
import type {
  ProxyConfigArray,
  ProxyConfigArrayItem,
  ProxyConfigMap,
  Middleware,
  ServerOptions,
  Configuration as DevServerConfiguration,
} from 'webpack-dev-server';
import type { Options } from 'eslint-webpack-plugin';
import type { ForkTsCheckerWebpackPluginOptions } from 'fork-ts-checker-webpack-plugin/lib/plugin-options';
import type { UnpluginOptions } from 'unplugin';
import type Server from 'webpack-dev-server';
import type { ECMA } from 'terser';
import type { Config as CompilationConfig } from '@builder/swc';
import type { BuildOptions } from 'esbuild';

// get type definitions from terser-webpack-plugin
interface CustomOptions {
  [key: string]: any;
}
type InferDefaultType<T> = T extends infer U ? U : CustomOptions;
interface PredefinedOptions {
  module?: boolean | undefined;
  ecma?: ECMA | undefined;
}
type MinimizerOptions<T> = PredefinedOptions & InferDefaultType<T>;

interface ConfigurationCtx extends Config {
  supportedBrowsers: string[];
  hashKey: string;
  webpack: typeof webpack;
}

interface SwcOptions {
  removeExportExprs?: string[];
  compilationConfig?: CompilationConfig;
}

type Experimental = Pick<Configuration, 'experiments'>;

export type ModifyWebpackConfig = (config: Configuration, ctx: ConfigurationCtx) => Configuration;
export interface Config {
  mode: 'none' | 'development' | 'production';

  define?: {
    [key: string]: string | boolean;
  };

  experimental?: Experimental;

  configureWebpack?: ModifyWebpackConfig[];

  outputDir?: string;

  externals?: Record<string, string | string[]>;

  outputAssetsPath?: Record<string, string>;

  sourceMap?: boolean | string;

  publicPath?: string;

  loaders?: (RuleSetRule | '...')[];

  plugins?: (
    | ((this: Compiler, compiler: Compiler) => void)
    | WebpackPluginInstance
  )[];

  alias?: Record<string, any>;

  hash?: boolean | string;

  transformPlugins?: UnpluginOptions[];

  transforms?: UnpluginOptions['transform'][];

  middlewares?:
  | ((middlewares: Middleware[], devServer: Server) => Middleware[])
  | undefined;

  proxy?: ProxyConfigArrayItem | ProxyConfigMap | ProxyConfigArray | undefined;

  compileIncludes?: (string | RegExp)[];

  minify?: boolean;

  minimizerOptions?: MinimizerOptions<CustomOptions>;

  analyzer?: boolean;

  https?: boolean | ServerOptions;

  port?: string | number;

  cacheDir?: string;

  tsCheckerOptions?: ForkTsCheckerWebpackPluginOptions;

  eslintOptions?: Options;

  swcOptions?: SwcOptions;

  entry?: {
    [key: string]: string;
  };

  splitChunks?: boolean;

  assetsManifest?: boolean;

  concatenateModules?: boolean;

  devServer?: DevServerConfiguration;

  fastRefresh?: boolean;

  basename?: string;

  logging?: string;

  memoryRouter?: boolean;

  server?: {
    buildOptions?: (options: BuildOptions) => BuildOptions;
  };
}
