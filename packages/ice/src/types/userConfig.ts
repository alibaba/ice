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
  /**
   * Optimize code by remove react-router dependencies when set to true.
   */
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
  /**
   * Feature polyfill for legacy browsers, which can not polyfilled by core-js.
   * @see https://v3.ice.work/docs/guide/basic/config#featurepolyfill
   */
  featurePolyfill?: {
    abortcontroller?: boolean | string;
  };
  output?: {
    distType: Array<DistType> | DistType;
    prependCode?: string;
  };
  /**
   * Alias for import certain modules more easily.
   * @see https://v3.ice.work/docs/guide/basic/config#alias
   */
  alias?: Record<string, string | false>;
  /**
   * Define global constants which can be configured at compile time.
   * @see https://v3.ice.work/docs/guide/basic/config#define
   */
  define?: Record<string, string | boolean>;
  /**
   * Configure the publicPath, it only works in dev mode.
   * @see https://v3.ice.work/docs/guide/basic/config#devpublicpath
   */
  devPublicPath?: string;
  /**
   * Configure the publicPath, it only works in prod mode.
   * @see https://v3.ice.work/docs/guide/basic/config#publicpath
   */
  publicPath?: string;
  /**
   * Configure hash based file name.
   * @see https://v3.ice.work/docs/guide/basic/config#hash
   */
  hash?: boolean | string;
  /**
   * Configure externals to prevent bundling certain imported packages and instead retrieve these external dependencies at runtime.
   * @see https://v3.ice.work/docs/guide/basic/config#externals
   */
  externals?: Config['externals'];
  /**
   * The output directory for build command.
   * @see https://v3.ice.work/docs/guide/basic/config#outputdir
   */
  outputDir?: string;
  /**
   * Proxy configuration for dev server, as same as webpack devServer.proxy.
   * @see https://v3.ice.work/docs/guide/basic/config#proxy
   */
  proxy?: Config['proxy'];
  /**
   * Polyfill mode for legacy browsers, works with .browserslistrc, support entry and usage.
   * @see https://v3.ice.work/docs/guide/basic/config#polyfill
   */
  polyfill?: Config['polyfill'];
  /**
   * Configure the output file name of build bundle.
   */
  filename?: string;
  /**
   * Modify the webpack configuration, it is not recommended.
   * @see https://v3.ice.work/docs/guide/basic/config#webpack
   */
  webpack?: ModifyWebpackConfig;
  /**
   * Allows to set PostCSS options and plugins.
   * @see https://v3.ice.work/docs/guide/basic/config#postcss
   */
  postcss?: ProcessOptions & {
    plugins?: (string | [string, Record<string, any>?])[];
  };
  /**
   * Custom file-system based route rules.
   * @see https://v3.ice.work/docs/guide/basic/config#routes
   */
  routes?: {
    /**
     * Ignore files when generate routes when match rule.
     */
    ignoreFiles?: string[];
    /**
     * Define route rules by API.
     */
    defineRoutes?: (defineRoute: DefineRouteFunction) => void;
    /**
     * Define route rules by route config.
     */
    config?: RouteItem[];
    /**
     * inject initial route path for each route html.
     */
    injectInitialEntry?: boolean;
  };
  /**
   * Add ice.js plugin to customize framework config.
   * @see https://v3.ice.work/docs/guide/basic/config#plugins
   */
  plugins?: PluginList<Config, OverwritePluginAPI>;
  /**
   * `console.*` will be dropped when build.
   * @see https://v3.ice.work/docs/guide/basic/config#droploglevel
   */
  dropLogLevel?: 'trace' | 'debug' | 'log' | 'info' | 'warn' | 'error';
  /**
   * Minify build output, it only works in prod mode by default.
   * @see https://v3.ice.work/docs/guide/basic/config#minify
   */
  minify?: boolean | 'swc' | MinifyOptions;
  /**
   * Compile dependencies, ice.js will compile all dependencies by default when build for compatibility.
   * @see https://v3.ice.work/docs/guide/basic/config#compiledependencies
   */
  compileDependencies?: boolean | string[] | RegExp[];
  /**
   * Choose a style of souce mapping to enhance the debugging process.
   * @see https://v3.ice.work/docs/guide/basic/config#sourcemap
   */
  sourceMap?: string | boolean;
  /**
   * Check typescript when compile source code.
   * @see https://v3.ice.work/docs/guide/basic/config#tschecker
   */
  tsChecker?: boolean;
  /**
   * Check source code by eslint if eslint options is configured.
   * @see https://v3.ice.work/docs/guide/basic/config#eslint
   */
  eslint?: Config['eslintOptions'] | boolean;
  /**
   * A switch for SSR (Server Side Rendering)
   * @see https://v3.ice.work/docs/guide/basic/config#ssr
   */
  ssr?: boolean;
  /**
   * A switch for SSG (Static Site Generation), it is true by default.
   * @see https://v3.ice.work/docs/guide/basic/config#ssg
   */
  ssg?: boolean;
  /**
   * config for server bundle
   * @see https://v3.ice.work/docs/guide/basic/config#server
   */
  server?: {
    /**
     * onDemand compilation for server when dev
     */
    onDemand?: boolean;
    /**
     * bundle format for server bundle, support esm and cjs
     */
    format?: 'esm' | 'cjs';
    /**
     * bundle server code as a single file
     */
    bundle?: boolean;
    /**
     * ignore file when bundle server code, module return empty when match
     */
    ignores?: IgnorePattern[];
    /**
     * externals config for server bundle
     */
    externals?: string[];
  };
  /**
   * Optimization options for build.
   * @sse https://v3.ice.work/docs/guide/basic/config#optimization
   */
  optimization?: Optimization;
  /**
   * Configure mock rules for development.
   * @see https://v3.ice.work/docs/guide/basic/config#mock
   */
  mock?: {
    exclude?: string[];
  };
  /**
   * Config for experimental features.
   * @see https://v3.ice.work/docs/guide/basic/config#experimental
   */
  experimental?: Config['experimental'];
  /**
   * Custom transform rules for source code.
   * @see https://v3.ice.work/docs/guide/basic/config#transform
   */
  transform?: UnpluginOptions['transform'];
  /**
   * Specify the syntax features you want to use.
   * @see https://v3.ice.work/docs/guide/basic/config#syntaxfeatures
   */
  syntaxFeatures?: SyntaxFeatures;
  /**
   * @deprecated
   * Please use `codeSplitting` instead
   */
  splitChunks?: boolean;
  /**
   * Code splitting strategy, support page and vendors, default value is true (built-in strategy).
   * @see https://v3.ice.work/docs/guide/basic/config#codesplitting
   */
  codeSplitting?: 'page' | 'vendors' | boolean;
  /**
   * generate additional assets for request data, default is true
   * @see https://v3.ice.work/docs/guide/basic/config#dataloader
   */
  dataLoader?: {
    fetcher?: Fetcher;
  } | Boolean;
  /**
   * Enable cross-origin loading of chunks.
   * @see https://v3.ice.work/docs/guide/basic/config#crossoriginloading
   */
  crossOriginLoading?: Config['output']['crossOriginLoading'];
}
