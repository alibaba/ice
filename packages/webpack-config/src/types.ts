import type webpack from '@ice/bundles/compiled/webpack';
import type { RuleSetRule, Configuration, Compiler, WebpackPluginInstance } from '@ice/bundles/compiled/webpack';
import type {
  ProxyConfigArray,
  ProxyConfigArrayItem,
  ProxyConfigMap,
  Middleware,
  ServerOptions,
} from 'webpack-dev-server';
import type { Options } from '@ice/bundles/compiled/eslint-webpack-plugin';
import type { ForkTsCheckerWebpackPluginOptions } from '@ice/bundles/compiled/fork-ts-checker-webpack-plugin';
import type { UnpluginOptions, UnpluginContext } from '@ice/bundles/compiled/unplugin';
import type Server from 'webpack-dev-server';
import type { Config as SWCCompilationConfig } from '@swc/core';
import type { BuildOptions } from 'esbuild';
import type { ProcessOptions } from 'postcss';

export type ECMA = 5 | 2015 | 2016 | 2017 | 2018 | 2019 | 2020;

// get type definitions from terser-webpack-plugin
interface CustomOptions {
  [key: string]: any;
}
type InferDefaultType<T> = T extends infer U ? U : CustomOptions;
interface PredefinedOptions {
  module?: boolean | undefined;
  ecma?: ECMA | undefined;
}
export type MinimizerOptions<T> = PredefinedOptions & InferDefaultType<T>;

interface ConfigurationCtx<T = typeof webpack> extends Config {
  hashKey: string;
  enableRpx2Vw: boolean;
  webpack: T;
  rootDir: string;
}

type Experimental = Configuration['experiments'];
interface SwcOptions {
  removeExportExprs?: string[];
  compilationConfig?: SWCCompilationConfig;
  keepPlatform?: 'node' | 'web' | 'weex' | 'miniapp' | 'wechat-miniprogram' | 'bytedance-microapp' | 'baidu-smartprogram' | 'kuaishou-miniprogram';
  keepExports?: string[];
  getRoutePaths?: Function;
}

type Output = Configuration['output'];
type Optimization = Configuration['optimization'];
type Performance = Configuration['performance'];

interface TransformOptions {
  isServer: boolean;
}
type Transform = (this: UnpluginContext, code: string, id: string, options: TransformOptions) => ReturnType<UnpluginOptions['transform']>;

// Only support transform and transformInclude for now
interface TransformPlugin {
  name: string;
  enforce?: string;
  transform?: Transform;
  transformInclude?: UnpluginOptions['transformInclude'];
  load?: UnpluginOptions['load'];
  loadInclude?: UnpluginOptions['loadInclude'];
}

export type ModifyWebpackConfig<T=Configuration, U=typeof webpack> = (config: T, ctx: ConfigurationCtx<U>) => T;
export type { webpack };
export interface Config {
  mode: 'none' | 'development' | 'production';

  define?: {
    [key: string]: string | boolean;
  };

  experimental?: Experimental;

  configureWebpack?: ModifyWebpackConfig[];

  output?: Output;

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

  alias?: Record<string, string | false>;

  hash?: boolean | string;

  transformPlugins?: TransformPlugin[];

  transforms?: Transform[];

  middlewares?:
  | ((middlewares: Middleware[], devServer: Server) => Middleware[])
  | undefined;

  proxy?: ProxyConfigArrayItem | ProxyConfigMap | ProxyConfigArray | undefined;

  polyfill?: 'usage' | 'entry' | false;
  // You can use `browserslist` to automatically configure supported browsers if set to be true.
  env?: boolean;

  compileIncludes?: (string | RegExp)[];

  minify?: boolean | string;

  minimizerOptions?: MinimizerOptions<CustomOptions>;

  analyzer?: boolean;

  https?: boolean | ServerOptions;

  port?: string | number;

  enableCache?: boolean;

  cacheDir?: string;

  tsCheckerOptions?: ForkTsCheckerWebpackPluginOptions;

  eslintOptions?: Options;

  swcOptions?: SwcOptions;

  entry?: {
    [key: string]: string;
  };

  splitChunks?: boolean;

  optimization?: Optimization;

  performance?: Performance;

  assetsManifest?: boolean;

  concatenateModules?: boolean;

  devServer?: Server.Configuration;

  fastRefresh?: boolean;

  basename?: string;

  logging?: string;

  memoryRouter?: boolean;

  server?: {
    entry?: string;

    buildOptions?: (options: BuildOptions) => BuildOptions;
  };

  cssFilename?: string;

  cssChunkFilename?: string;

  postcss?: ProcessOptions & { plugins?: (string | [string, Record<string, any>?])[] };
  enableCopyPlugin?: boolean;

  enableRpx2Vw?: boolean;

  getAppConfig?: (exportNamse?: string[]) => Promise<any>;

  getRoutesConfig?: (specifyRoutId?: string) => Promise<any>;
}
