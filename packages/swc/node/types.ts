/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable camelcase */
export interface Binding {
  transformSync: (src: string, isModule: boolean, options: Buffer) => Output;
  transform: (src: string, isModule: boolean, options: Buffer) => Promise<Output>;
  minifySync: (src: Buffer, options: Buffer) => Output;
  minify: (src: Buffer, options: Buffer) => Promise<Output>;
}

export type TerserEcmaVersion = 5 | 2015 | 2016 | string | number;

export interface JsMinifyOptions {
  compress?: TerserCompressOptions | boolean,

  mangle?: TerserMangleOptions | boolean,

  ecma?: TerserEcmaVersion,

  keep_classnames?: boolean,

  keep_fnames?: boolean,

  module?: boolean,

  safari10?: boolean

  toplevel?: boolean

  sourceMap?: boolean

  outputPath?: string

  inlineSourcesContent?: boolean
}

export interface TerserCompressOptions {
  arguments?: boolean,
  arrows?: boolean,

  booleans?: boolean,

  booleans_as_integers?: boolean,

  collapse_vars?: boolean,

  comparisons?: boolean,

  computed_props?: boolean,

  conditionals?: boolean,

  dead_code?: boolean,

  defaults?: boolean,

  directives?: boolean,

  drop_console?: boolean,

  drop_debugger?: boolean,

  ecma?: TerserEcmaVersion,

  evaluate?: boolean,

  expression?: boolean,

  global_defs?: any,

  hoist_funs?: boolean,

  hoist_props?: boolean,

  hoist_vars?: boolean,

  ie8?: boolean,

  if_return?: boolean,

  inline?: 0 | 1 | 2 | 3

  join_vars?: boolean,

  keep_classnames?: boolean,

  keep_fargs?: boolean,

  keep_fnames?: boolean,

  keep_infinity?: boolean,

  loops?: boolean,
  // module        : false,

  negate_iife?: boolean,

  passes?: number,

  properties?: boolean,

  pure_getters?: any,

  pure_funcs?: string[],

  reduce_funcs?: boolean,

  reduce_vars?: boolean,

  sequences?: any,

  side_effects?: boolean,

  switches?: boolean,

  top_retain?: any,

  toplevel?: any,

  typeofs?: boolean,

  unsafe_passes?: boolean,

  unsafe_arrows?: boolean,

  unsafe_comps?: boolean,

  unsafe_function?: boolean,

  unsafe_math?: boolean,

  unsafe_symbols?: boolean,

  unsafe_methods?: boolean,

  unsafe_proto?: boolean,

  unsafe_regexp?: boolean,

  unsafe_undefined?: boolean,

  unused?: boolean,

  module?: boolean,
}

export interface TerserMangleOptions {
  props?: TerserManglePropertiesOptions,

  top_level?: boolean,

  keep_class_names?: boolean,

  keep_fn_names?: boolean,

  keep_private_props?: boolean,

  ie8?: boolean,

  safari10?: boolean,
}

export interface TerserManglePropertiesOptions {

}

/**
 * Programmatic options.
 */
export interface Options extends Config {
  /**
   * If true, a file is parsed as a script instead of module.
   */
  script?: boolean;

  /**
   * The working directory that all paths in the programmatic
   * options will be resolved relative to.
   *
   * Defaults to `process.cwd()`.
   */
  cwd?: string;
  caller?: CallerOptions;
  /** The filename associated with the code currently being compiled,
   * if there is one. The filename is optional, but not all of Swc's
   * functionality is available when the filename is unknown, because a
   * subset of options rely on the filename for their functionality.
   *
   * The three primary cases users could run into are:
   *
   * - The filename is exposed to plugins. Some plugins may require the
   * presence of the filename.
   * - Options like "test", "exclude", and "ignore" require the filename
   * for string/RegExp matching.
   * - .swcrc files are loaded relative to the file being compiled.
   * If this option is omitted, Swc will behave as if swcrc: false has been set.
   */
  filename?: string;

  /**
   * The initial path that will be processed based on the "rootMode" to
   * determine the conceptual root folder for the current Swc project.
   * This is used in two primary cases:
   *
   * - The base directory when checking for the default "configFile" value
   * - The default value for "swcrcRoots".
   *
   * Defaults to `opts.cwd`
   */
  root?: string;

  /**
   * This option, combined with the "root" value, defines how Swc chooses
   * its project root. The different modes define different ways that Swc
   * can process the "root" value to get the final project root.
   *
   * "root" - Passes the "root" value through as unchanged.
   * "upward" - Walks upward from the "root" directory, looking for a directory
   * containinga swc.config.js file, and throws an error if a swc.config.js
   * is not found.
   * "upward-optional" - Walk upward from the "root" directory, looking for
   * a directory containing a swc.config.js file, and falls back to "root"
   *  if a swc.config.js is not found.
   *
   *
   * "root" is the default mode because it avoids the risk that Swc
   * will accidentally load a swc.config.js that is entirely outside
   * of the current project folder. If you use "upward-optional",
   * be aware that it will walk up the directory structure all the
   * way to the filesystem root, and it is always possible that someone
   * will have a forgotten swc.config.js in their home directory,
   * which could cause unexpected errors in your builds.
   *
   *
   * Users with monorepo project structures that run builds/tests on a
   * per-package basis may well want to use "upward" since monorepos
   * often have a swc.config.js in the project root. Running Swc
   * in a monorepo subdirectory without "upward", will cause Swc
   * to skip loading any swc.config.js files in the project root,
   * which can lead to unexpected errors and compilation failure.
   */
  rootMode?: 'root' | 'upward' | 'upward-optional';

  /**
   * The current active environment used during configuration loading.
   * This value is used as the key when resolving "env" configs,
   * and is also available inside configuration functions, plugins,
   * and presets, via the api.env() function.
   *
   * Defaults to `process.env.SWC_ENV || process.env.NODE_ENV || "development"`
   */
  envName?: string;

  /**
   * Defaults to searching for a default `.swcrc` file, but can
   * be passed the path of any JS or JSON5 config file.
   *
   *
   * NOTE: This option does not affect loading of .swcrc files,
   * so while it may be tempting to do configFile: "./foo/.swcrc",
   * it is not recommended. If the given .swcrc is loaded via the
   * standard file-relative logic, you'll end up loading the same
   * config file twice, merging it with itself. If you are linking
   * a specific config file, it is recommended to stick with a
   * naming scheme that is independent of the "swcrc" name.
   *
   * Defaults to `path.resolve(opts.root, ".swcrc")`
   */
  configFile?: string | boolean;

  /**
   * true will enable searching for configuration files relative to the "filename" provided to Swc.
   *
   * A swcrc value passed in the programmatic options will override one set within a configuration file.
   *
   * Note: .swcrc files are only loaded if the current "filename" is inside of
   *  a package that matches one of the "swcrcRoots" packages.
   *
   *
   * Defaults to true as long as the filename option has been specificed
   */
  swcrc?: boolean;

  /**
   * By default, Babel will only search for .babelrc files within the "root" package
   *  because otherwise Babel cannot know if a given .babelrc is meant to be loaded,
   *  or if it's "plugins" and "presets" have even been installed, since the file
   *  being compiled could be inside node_modules, or have been symlinked into the project.
   *
   *
   * This option allows users to provide a list of other packages that should be
   * considered "root" packages when considering whether to load .babelrc files.
   *
   *
   * For example, a monorepo setup that wishes to allow individual packages
   * to have their own configs might want to do
   *
   *
   *
   * Defaults to `opts.root`
   */
  swcrcRoots?: boolean | MatchPattern | MatchPattern[];

  /**
   * `true` will attempt to load an input sourcemap from the file itself, if it
   * contains a //# sourceMappingURL=... comment. If no map is found, or the
   * map fails to load and parse, it will be silently discarded.
   *
   *  If an object is provided, it will be treated as the source map object itself.
   *
   * Defaults to `true`.
   */
  inputSourceMap?: boolean | string;

  /**
   * The name to use for the file inside the source map object.
   *
   * Defaults to `path.basename(opts.filenameRelative)` when available, or `"unknown"`.
   */
  sourceFileName?: string;

  /**
   * The sourceRoot fields to set in the generated source map, if one is desired.
   */
  sourceRoot?: string;

  plugin?: Plugin;

  isModule?: boolean;

  /**
   * Destination path. Note that this value is used only to fix source path
   * of source map files and swc does not write output to this path.
   */
  outputPath?: string;
  keepPlatform ?: string;
}

export interface CallerOptions {
  name: string;
  [key: string]: any;
}

export type Swcrc = Config | Config[];

/**
 * .swcrc
 */
export interface Config {
  /**
   * Note: The type is string beacuse it follow rust's regex syntax.
   */
  test?: string | string[];
  /**
   * Note: The type is string beacuse it follow rust's regex syntax.
   */
  exclude?: string | string[];
  env?: EnvConfig;
  jsc?: JscConfig;
  module?: ModuleConfig;
  minify?: boolean;

  /**
   * - true to generate a sourcemap for the code and include it in the result object.
   * - "inline" to generate a sourcemap and append it as a data URL to the end of the code, but not include it in the result object.
   *
   * `swc-cli` overloads some of these to also affect how maps are written to disk:
   *
   * - true will write the map to a .map file on disk
   * - "inline" will write the file directly, so it will have a data: containing the map
   * - Note: These options are bit weird, so it may make the most sense to just use true
   *  and handle the rest in your own code, depending on your use case.
   */
  sourceMaps?: boolean | 'inline';

  inlineSourcesContent?: boolean
}

/**
 * Configuration ported from babel-preset-env
 */
export interface EnvConfig {
  mode?: 'usage' | 'entry';
  debug?: boolean;
  dynamicImport?: boolean;

  loose?: boolean;

  /// Skipped es features.
  ///
  /// e.g.)
  ///  - `core-js/modules/foo`
  skip?: string[];

  include?: string[];

  exclude?: string[];

  /**
   * The version of the used core js.
   *
   */
  coreJs?: string;

  targets?: any;

  path?: string;

  shippedProposals?: boolean;

  /**
   * Enable all trnasforms
   */
  forceAllTransforms?: boolean;
}

export interface JscConfig {
  loose?: boolean;

  /**
   * Defaults to EsParserConfig
   */
  parser?: ParserConfig;
  transform?: TransformConfig;
  /**
   * Use `@swc/helpers` instead of inline helpers.
   */
  externalHelpers?: boolean;

  /**
   * Defaults to `es3` (which enableds **all** pass).
   */
  target?: JscTarget;

  /**
   * Keep class names.
   */
  keepClassNames?: boolean

  experimetal?: {
    optimizeHygiene?: boolean
  },

  paths?: {
    [from: string]: [string]
  },
  minify?: JsMinifyOptions
}

export type JscTarget =
  | 'es3'
  | 'es5'
  | 'es2015'
  | 'es2016'
  | 'es2017'
  | 'es2018'
  | 'es2019'
  | 'es2020'
  | 'es2021';

export type ParserConfig = TsParserConfig | EsParserConfig;
export interface TsParserConfig {
  syntax: 'typescript';
  /**
   * Defaults to `false`.
   */
  tsx?: boolean;
  /**
   * Defaults to `false`.
   */
  decorators?: boolean;
  /**
   * Defaults to `false`
   */
  dynamicImport?: boolean;
}

export interface EsParserConfig {
  syntax: 'ecmascript';
  /**
   * Defaults to false.
   */
  jsx?: boolean;
  /**
   * @deprecated Always true because it's in ecmascript spec.
   */
  numericSeparator?: boolean;
  /**
   * @deprecated Always true because it's in ecmascript spec.
   */
  classPrivateProperty?: boolean;
  /**
   * @deprecated Always true because it's in ecmascript spec.
   */
  privateMethod?: boolean;
  /**
   * @deprecated Always true because it's in ecmascript spec.
   */
  classProperty?: boolean;
  /**
   * Defaults to `false`
   */
  functionBind?: boolean;
  /**
   * Defaults to `false`
   */
  decorators?: boolean;
  /**
   * Defaults to `false`
   */
  decoratorsBeforeExport?: boolean;
  /**
   * Defaults to `false`
   */
  exportDefaultFrom?: boolean;
  /**
   * @deprecated Always true because it's in ecmascript spec.
   */
  exportNamespaceFrom?: boolean;
  /**
   * @deprecated Always true because it's in ecmascript spec.
   */
  dynamicImport?: boolean;
  /**
   * @deprecated Always true because it's in ecmascript spec.
   */
  nullishCoalescing?: boolean;
  /**
   * @deprecated Always true because it's in ecmascript spec.
   */
  optionalChaining?: boolean;
  /**
   * @deprecated Always true because it's in ecmascript spec.
   */
  importMeta?: boolean;
  /**
   * @deprecated Always true because it's in ecmascript spec.
   */
  topLevelAwait?: boolean;
  /**
   * Defaults to `false`
   */
  importAssertions?: boolean;
}

/**
 * Options for trasnform.
 */
export interface TransformConfig {
  /**
   * Effective only if `syntax` supports ƒ.
   */
  react?: ReactConfig;

  constModules?: ConstModulesConfig;

  /**
   * Defaults to null, which skips optimizer pass.
   */
  optimizer?: OptimizerConfig;

  /**
   * https://swc.rs/docs/configuring-swc.html#jsctransformlegacydecorator
   */
  legacyDecorator?: boolean;

  /**
   * https://swc.rs/docs/configuring-swc.html#jsctransformdecoratormetadata
   */
  decoratorMetadata?: boolean;
}

export interface ReactConfig {
  /**
   * Replace the function used when compiling JSX expressions.
   *
   * Defaults to `React.createElement`.
   */
  pragma?: string;
  /**
   * Replace the component used when compiling JSX fragments.
   *
   * Defaults to `React.Fragment`
   */
  pragmaFrag?: string;
  /**
   * Toggles whether or not to throw an error if a XML namespaced tag name is used. For example:
   * `<f:image />`
   *
   * Though the JSX spec allows this, it is disabled by default since React's
   * JSX does not currently have support for it.
   *
   */
  throwIfNamespace?: boolean;
  /**
   * Toggles plugins that aid in development, such as @swc/plugin-transform-react-jsx-self
   * and @swc/plugin-transform-react-jsx-source.
   *
   * Defaults to `false`,
   *
   */
  development?: boolean;
  /**
   * Use `Object.assign()` instead of `_extends`. Defaults to false.
   */
  useBuiltins?: boolean;

  /**
   * Enable fast refresh feature for React app
   */
  refresh?: boolean;

  /**
   * jsx runtime
   */
  runtime?: 'automatic' | 'classic'

  /**
   * Declares the module specifier to be used for importing the `jsx` and `jsxs` factory functions when using `runtime` 'automatic'
   */
  importSource?: string
}
/**
 *  - `import { DEBUG } from '@ember/env-flags';`
 *  - `import { FEATURE_A, FEATURE_B } from '@ember/features';`
 *
 * See: https://github.com/swc-project/swc/issues/18#issuecomment-466272558
 */
export interface ConstModulesConfig {
  globals?: {
    [module: string]: {
      [name: string]: string;
    };
  };
}

/// https://swc.rs/docs/configuring-swc.html#jsctransformoptimizerjsonify
export interface OptimizerConfig {
  /// https://swc.rs/docs/configuring-swc#jsctransformoptimizer
  globals?: GlobalPassOption;
  jsonify?: { minCost: number };
  simplify?: boolean;
}

/**
 * Options for inline-global pass.
 */
export interface GlobalPassOption {
  /**
   * Global variables.
   *
   * e.g. `{ __DEBUG__: true }`
   */
  vars?: { [key: string]: string };

  /**
   * Name of environment variables to inline.
   *
   * Defaults to `["NODE_ENV", "SWC_ENV"]`
   */
  envs?: string[];
}

export type ModuleConfig = CommonJsConfig | UmdConfig | AmdConfig;

export interface BaseModuleConfig {
  /**
   * By default, when using exports with babel a non-enumerable `__esModule`
   * property is exported. In some cases this property is used to determine
   * if the import is the default export or if it contains the default export.
   *
   * In order to prevent the __esModule property from being exported, you
   *  can set the strict option to true.
   *
   * Defaults to `false`.
   */
  strict?: boolean;

  /**
   * Emits 'use strict' directive.
   *
   * Defaults to `true`.
   */
  strictMode?: boolean;

  /**
   * Changes Babel's compiled import statements to be lazily evaluated when their imported bindings are used for the first time.
   *
   * This can improve initial load time of your module because evaluating dependencies up
   *  front is sometimes entirely un-necessary. This is especially the case when implementing
   *  a library module.
   *
   *
   * The value of `lazy` has a few possible effects:
   *
   *  - `false` - No lazy initialization of any imported module.
   *  - `true` - Do not lazy-initialize local `./foo` imports, but lazy-init `foo` dependencies.
   *
   * Local paths are much more likely to have circular dependencies, which may break if loaded lazily,
   * so they are not lazy by default, whereas dependencies between independent modules are rarely cyclical.
   *
   *  - `Array<string>` - Lazy-initialize all imports with source matching one of the given strings.
   *
   * -----
   *
   * The two cases where imports can never be lazy are:
   *
   *  - `import "foo";`
   *
   * Side-effect imports are automatically non-lazy since their very existence means
   *  that there is no binding to later kick off initialization.
   *
   *  - `export * from "foo"`
   *
   * Re-exporting all names requires up-front execution because otherwise there is no
   * way to know what names need to be exported.
   *
   * Defaults to `false`.
   */
  lazy?: boolean | string[];
  /**
   * By default, when using exports with swc a non-enumerable __esModule property is exported.
   * This property is then used to determine if the import is the default export or if
   *  it contains the default export.
   *
   * In cases where the auto-unwrapping of default is not needed, you can set the noInterop option
   *  to true to avoid the usage of the interopRequireDefault helper (shown in inline form above).
   *
   * Defaults to `false`.
   */
  noInterop?: boolean;
}

export interface CommonJsConfig extends BaseModuleConfig {
  type: 'commonjs';
}

export interface UmdConfig extends BaseModuleConfig {
  type: 'umd';
  globals?: { [key: string]: string };
}

export interface AmdConfig extends BaseModuleConfig {
  type: 'amd';
  moduleId?: string;
}

export interface Output {
  /**
   * Transformed code
   */
  code: string;
  /**
   * Sourcemap (**not** base64 encoded)
   */
  map?: string;
}

export interface MatchPattern { }
