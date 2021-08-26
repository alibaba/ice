import * as WebpackDevServer from 'webpack-dev-server';
import * as httpProxyMiddleware from 'http-proxy-middleware';
import { MinifyOptions } from 'terser';
import * as SassLoader from 'sass-loader';
import type { ESLint } from 'eslint';
import { transform, TransformOptions } from 'esbuild';
import { Config, JsMinifyOptions } from '@swc/core';
import { ProcessOptions } from 'postcss';
import { Except } from 'type-fest';

interface ExternalsFunctionCallback {
  /**
   * Invoke with no arguments to not externalize
   */
  (): void;
  /**
   * Callback with an Error
   */
  (error: {}): void;
  /**
   * Externalize the dependency
   */
  (error: null, result: string | string[] | ExternalsObjectElement, type?: string): void;
}
type ExternalsFunctionElement = (context: any, request: any, callback: ExternalsFunctionCallback) => any;

interface ExternalsObjectElement {
  [key: string]: boolean | string | string[] | Record<string, string | string[]>;
}
type ExternalsElement = string | RegExp | ExternalsObjectElement | ExternalsFunctionElement;

type LibraryTarget = 'var' | 'assign' | 'this' | 'window' | 'global' | 'commonjs' | 'commonjs2' | 'amd' | 'umd' | 'jsonp' | 'system';
type Devtool = 'eval' | 'eval-cheap-source-map' | 'eval-cheap-module-source-map' | 'eval-source-map'
| 'cheap-source-map' | 'cheap-module-source-map' | 'source-map'
| 'inline-cheap-source-map' | 'inline-cheap-module-source-map' | 'inline-source-map'
| 'eval-nosources-cheap-source-map' | 'eval-nosources-cheap-module-source-map' | 'eval-nosources-source-map'
| 'inline-nosources-cheap-source-map' | 'inline-nosources-cheap-module-source-map' | 'inline-nosources-source-map'
| 'nosources-cheap-source-map' | 'nosources-cheap-module-source-map' | 'nosources-source-map'
| 'hidden-nosources-cheap-source-map' | 'hidden-nosources-cheap-module-source-map' | 'hidden-nosources-source-map' | 'hidden-cheap-source-map' | 'hidden-cheap-module-source-map' | 'hidden-source-map';

interface WatchOptions {
  aggregateTimeout?: number;
  followSymlinks?: boolean;
  ignored?: string | RegExp | string[];
  poll?: boolean | number;
  stdin?: boolean;
}

interface Mock {
  exclude?: string[]
}

interface ProxyConfigMap {
  [url: string]: string | httpProxyMiddleware.Options;
}

type EntryOptions = undefined | Record<string, any>| false;
type PluginEntry = string | [string, EntryOptions] | [string, EntryOptions, string];
type PresetEntry = PluginEntry;

interface EslintOptions {
  cache?: string | boolean;
  eslintPath?: string;
  fix?: boolean;
  formatter?: string | ((results: ESLint.LintResult[]) => string);
  emitError?: boolean;
  emitWarning?: boolean;
  failOnError?: boolean;
  failOnWarning?: boolean;
  quiet?: boolean;
  outputReport?: boolean | { filePath: string; formatter: string };
}

interface Loaders {
  [loaderName: string]: {
    before?: string;
    after?: string;
    options?: any;
  }
}

interface WebpackLoaders {
  [ruleName: string]: {
    test?: string | string[];
    oneOf?: {
      [oneOfName: string]: {
        resourceQuery: string | string[];
        loaders: Loaders
      }
    }
    includeClear?: boolean;
    include?: string | string[];
    excludeClear?: boolean;
    exclude?: string | string[];
    pre?: boolean;
    post?: boolean;
    enforce?: boolean;
    before?: string;
    after?: string;
    loaders?: Loaders;
  }
}

interface WebpackPlugins {
  [pluginName: string]: {
    after?: string;
    before?: string;
    options?: any;
  }
}

type Filter = string | RegExp;

type Implementation = {
  transform: typeof transform;
};

type MinifyPluginOptions = Except<TransformOptions, 'sourcefile'> & {
  include?: Filter | Filter[];
  exclude?: Filter | Filter[];
  css?: boolean;
  /** Pass a custom esbuild implementation */
  implementation?: Implementation;
};

interface PostcssOptions extends ProcessOptions {
  plugins?: { [pluginName: string]: Record<string, any> };
}

// https://webpack.js.org/loaders/css-loader/#options
interface CSSLoaderOptions {
  url?: boolean | object;
  import?: boolean | object;
  modules?: boolean | string | object;
  sourceMap?: boolean;
  importLoaders?: number;
  esModule?: boolean;
}

type LoaderCallback<T> = (loaderContext: any) => T;
// https://webpack.js.org/loaders/less-loader/#options
interface LessLoaderOptions {
  lessOptions?: Less.Options;
  additionalData?: string | LoaderCallback<string>;
  sourceMap?: boolean;
  webpackImporter?: boolean;
  implementation?: any;
}

type Minifier = 'terser' | 'esbuild' | 'swc';
interface MinifierConfig {
  type: Minifier;
  options: JsMinifyOptions | MinifyOptions | MinifyPluginOptions;
}

export interface BaseUserConfig {
  alias?: Record<string, string>;
  define?: Record<string, string>;
  devPublicPath?: string;
  publicPath?: string;
  filename?: string;
  extensions?: string[];
  modules?: string[];
  watchOptions?: WatchOptions;
  devServer?: WebpackDevServer.Configuration;
  mock?: boolean | Mock;
  externals?: ExternalsElement | ExternalsElement[];
  hash?: boolean | string;
  minify?: boolean | Minifier | MinifierConfig;
  outputAssetsPath?: {
    js?: string;
    css?: string;
  };
  outputDir?: string;
  proxy?: ProxyConfigMap;
  browserslist?: string | string[] | Record<string, string>;
  vendor?: boolean;
  libraryTarget?: LibraryTarget;
  library?: string | Record<string, string>;
  libraryExport?: string | string[];
  sourceMap?: boolean | Devtool;
  sassLoaderOptions?: SassLoader.Options;
  cssLoaderOptions?: CSSLoaderOptions;
  lessLoaderOptions?: LessLoaderOptions;
  postcssOptions?: PostcssOptions;
  postcssrc?: boolean;
  compileDependencies?: string[];
  babelPlugins?: PluginEntry[];
  babelPresets?: PresetEntry[];
  eslint?: boolean | EslintOptions;
  tsChecker?: boolean;
  polyfill?: boolean | 'entry' | 'usage';
  targets?: string[];
  webpackLoaders?: WebpackLoaders;
  webpackPlugins?: WebpackPlugins;
  swc?: boolean | Config;
}
