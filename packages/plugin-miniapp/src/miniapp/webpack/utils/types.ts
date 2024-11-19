import type { MiniappAppConfig, MiniappConfig } from '@ice/miniapp-runtime/esm/types.js';
import type { RecursiveTemplate, UnRecursiveTemplate } from '@ice/shared';
import type { Compilation, Compiler } from '@ice/bundles/compiled/webpack';
import type { IComponentConfig } from './component.js';

export interface IOption {
  [key: string]: any;
}

export interface IComponent {
  name: string;
  path: string;
  isNative: boolean;
  stylePath?: string[];
  templatePath?: string;
  skeletonPath?: IComponentExtraPath;
}

export interface IComponentExtraPath {
  template?: string;
  style?: string[];
}

export interface IComponentObj {
  name?: string;
  path: string | null;
  type?: string;
}

export interface IChain {
  [key: string]: any;
}

export interface IFileType {
  style: string;
  script: string;
  templ: string;
  config: string;
  xs?: string;
  skeletonMidExt?: string;
}

interface IMiniAppConfig {
  isWatch?: boolean;
  port?: number;
  /** 项目名称 */
  projectName?: string;

  /** 项目创建日期 */
  date?: string;

  /** 设计稿尺寸 */
  // designWidth?: number | ((size?: string | number | Input) => number)

  /** 设计稿尺寸换算规则 */
  // deviceRatio?: TaroGeneral.TDeviceRatio

  watcher?: any[];

  /** 源码存放目录 (默认值：'src') */
  sourceRoot?: string;

  /** 代码编译后的生产目录 (默认值：'dist') */
  outputRoot?: string;

  /**
   * 用于配置`process.env.xxxx`相关的环境变量
   * @deprecated 建议使用根目录下的 .env 文件替代
   * @description 注意：这里的环境变量只能在业务代码中使用，编译时的 node 环境中无法使用
   * @example
   * ```ts
   * // config/index.ts
   * export default defineConfig({
   *    env: {
   *      xxxx: '"测试"'
   *    }
   * })
   *
   * // src/app.ts
   * onShow() {
   *   console.log(process.env.xxxx) // 打印 "测试"
   * }
   * ```
   */
  env?: IOption;

  /** 用于配置目录别名，从而方便书写代码引用路径 */
  alias?: IOption;

  /**
   * 用于配置一些常量供代码中进行全局替换使用
   * @description 注意：这里的环境变量只能在业务代码中使用，编译时的 node 环境中无法使用
   * @example
   * ```ts
   * // config/index.ts
   * export default defineConfig({
   *    defineConstants: {
   *        __TEST__: JSON.stringify('test')
   *    }
   * })
   *
   * // src/app.ts
   * onShow() {
   *   console.log(__TEST__) // 打印 "test"
   * }
   * ```
   */
  defineConstants?: IOption;

  /** 用于把文件从源码目录直接拷贝到编译后的生产目录 */
  // copy?: ICopyOptions

  /** 配置 JS 压缩工具 (默认 terser) */
  jsMinimizer?: 'terser' | 'esbuild';

  /** 配置 CSS 压缩工具 (默认 csso) */
  cssMinimizer?: 'csso' | 'esbuild' | 'lightningcss';

  /** 配置 csso 工具以压缩 CSS 代码 */
  // csso?: TogglableOptions

  /** 配置 terser 工具以压缩 JS 代码 */
  // terser?: TogglableOptions

  // esbuild?: Record<'minify', TogglableOptions>

  // uglify?: TogglableOptions

  /** 用于控制对 scss 代码的编译行为，默认使用 dart-sass，具体配置可以参考 https://www.npmjs.com/package/sass */
  // sass?: ISassOptions

  /** 配置 Taro 插件 */
  // plugins?: PluginItem[]

  /** 一个 preset 是一系列 Taro 插件的集合，配置语法同 plugins */
  // presets?: PluginItem[]

  /** 模板循环次数 */
  baseLevel?: number;

  /** 使用的开发框架。可选值：react、preact、vue3 */
  framework?: 'react' | 'preact' | 'solid' | 'vue3';
  frameworkExts?: string[];

  /** 使用的编译工具。可选值：webpack5 */
  // compiler?: Compiler

  /** Webpack5 持久化缓存配置。具体配置请参考 [WebpackConfig.cache](https://webpack.js.org/configuration/cache/#cache) */
  // cache?: ICache

  /** 控制 Taro 编译日志的输出方式 */
  // logger?: ILogger
  logger?: any;

  /** 用于控制是否生成 js、css 对应的 sourceMap */
  enableSourceMap?: boolean;

  /**
   * 编译开始
   */
  onBuildStart?: (...args: any[]) => Promise<any>;

  /**
   * 编译完成（启动项目后首次编译结束后会触发一次）
   */
  onBuildComplete?: (...args: any[]) => Promise<any>;

  /**
   * 编译结束（保存代码每次编译结束后都会触发）
   */
  onBuildFinish?: (res: { error; stats; isWatch }) => Promise<any>;

  /**
   * 修改编译过程中的页面组件配置
   */
  onCompilerMake?: (compilation: Compilation, compiler: Compiler, plugin: any) => Promise<any>;

  // onWebpackChainReady?: (webpackChain: Chain) => Promise<any>

  modifyAppConfig?: (appConfig: MiniappAppConfig) => Promise<any>;

  /**
   * 编译中修改 webpack 配置，在这个钩子中，你可以对 webpackChain 作出想要的调整，等同于配置 [`webpackChain`](./config-detail#miniwebpackchain)
   */
  // modifyWebpackChain?: (chain: Chain, webpack: typeof Webpack, data: IModifyChainData) => Promise<any>

  /**
   * 编译中修改 vite 配置
   */
  // modifyViteConfig?: (viteConfig: any, data: IModifyChainData) => void

  /**
   * 修改编译后的结果
   */
  modifyBuildAssets?: (assets: any, miniPlugin?: any) => Promise<any>;

  /**
   * 修改编译过程中的页面组件配置
   */
  modifyMiniConfigs?: (configMap: IMiniFilesConfig) => Promise<any>;

  /**
   * 修改 Taro 编译配置
   */
  modifyRunnerOpts?: (opts: any) => Promise<any>;
}

interface IProjectBaseConfig {
  /** 用于控制是否生成 js、css 对应的 sourceMap (默认值：watch 模式下为 true，否则为 false) */
  enableSourceMap?: boolean;

  /** 默认值：'cheap-module-source-map'， 具体参考[Webpack devtool 配置](https://webpack.js.org/configuration/devtool/#devtool) */
  sourceMapType?: string;

  /** 指定 React 框架相关的代码是否使用开发环境（未压缩）代码，默认使用生产环境（压缩后）代码 */
  debugReact?: boolean;

  /** 是否跳过第三方依赖 usingComponent 的处理，默认为自动处理第三方依赖的自定义组件 */
  skipProcessUsingComponents?: boolean;

  /** 压缩小程序 xml 文件的相关配置 */
  minifyXML?: {
    /** 是否合并 xml 文件中的空格 (默认false) */
    collapseWhitespace?: boolean;
  };

  /**
   * 自定义 Webpack 配置
   * @param chain  [webpackChain](https://github.com/neutrinojs/webpack-chain) 对象
   * @param webpack webpack 实例
   * @param PARSE_AST_TYPE 小程序编译时的文件类型集合
   * @returns
   */
  // webpackChain?: (chain: Chain, webpack: typeof Webpack, PARSE_AST_TYPE: any) => void

  /** webpack 编译模式下，可用于修改、拓展 Webpack 的 output 选项，配置项参考[官方文档](https://webpack.js.org/configuration/output/)
   * vite 编译模式下，用于修改、扩展 rollup 的 output，目前仅适配 chunkFileNames 和 assetFileNames 两个配置，修改其他配置请使用 vite 插件进行修改。配置想参考[官方文档](https://rollupjs.org/configuration-options/)
   */
  // output?: T extends 'vite'
  //   ? Pick<RollupOutputOptions, 'chunkFileNames'>  & OutputExt
  //   : Webpack.Configuration['output'] & OutputExt

  /** 配置 postcss 相关插件 */
  // postcss?: IPostcssOption<'mini'>

  /** [css-loader](https://github.com/webpack-contrib/css-loader) 的附加配置 */
  cssLoaderOption?: IOption;

  /** [sass-loader](https://github.com/webpack-contrib/sass-loader) 的附加配置 */
  sassLoaderOption?: IOption;

  /** [less-loader](https://github.com/webpack-contrib/less-loader) 的附加配置 */
  lessLoaderOption?: IOption;

  /** [stylus-loader](https://github.com/shama/stylus-loader) 的附加配置 */
  stylusLoaderOption?: IOption;

  /** 针对 mp4 | webm | ogg | mp3 | wav | flac | aac 文件的 [url-loader](https://github.com/webpack-contrib/url-loader) 配置 */
  // mediaUrlLoaderOption?: IUrlLoaderOption

  /** 针对 woff | woff2 | eot | ttf | otf 文件的 [url-loader](https://github.com/webpack-contrib/url-loader) 配置 */
  // fontUrlLoaderOption?: IUrlLoaderOption

  /** 针对 png | jpg | jpeg | gif | bpm | svg 文件的 [url-loader](https://github.com/webpack-contrib/url-loader) 配置 */
  // imageUrlLoaderOption?: IUrlLoaderOption

  /** [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) 的附加配置 */
  miniCssExtractPluginOption?: IOption;

  /** 用于告诉 Taro 编译器需要抽取的公共文件 */
  commonChunks?: string[] | ((commonChunks: string[]) => string[]);

  /** 为某些页面单独指定需要引用的公共文件 */
  addChunkPages?: (pages: Map<string, string[]>, pagesNames?: string[]) => void;

  /** 优化主包的体积大小 */
  optimizeMainPackage?: {
    enable?: boolean;
    exclude?: any[];
  };

  /** 小程序编译过程的相关配置 */
  compile?: {
    exclude?: (string | RegExp)[];
    include?: (string | RegExp)[];
    filter?: (filename: string) => boolean;
  };

  /** 插件内部使用 */
  // runtime?: Runtime

  /** 使用的编译工具。可选值：webpack5、vite */
  // compiler?: Compiler<T>

  /** 体验式功能 */
  experimental?: {
    /** 是否开启编译模式 */
    compileMode?: boolean | string;
  };
}

export interface CommonBuildConfig extends IProjectBaseConfig {
  // entry?: webpack.EntryObject;
  mode: 'production' | 'development' | 'none';
  buildAdapter: string; // weapp | swan | alipay | tt | qq | jd | h5
  platformType: string; // mini | web
  /** special mode */
  isBuildNativeComp?: boolean;
  newBlended?: boolean;
  withoutBuild?: boolean;
  noInjectGlobalStyle?: boolean;
  /** hooks */
  onParseCreateElement: (nodeName, componentConfig) => Promise<any>;
  modifyComponentConfig: (componentConfig: IComponentConfig, config: Partial<CommonBuildConfig>) => Promise<any>;
}

export interface IMiniBuildConfig extends CommonBuildConfig, IMiniAppConfig {
  isBuildPlugin: boolean;
  isSupportRecursive: boolean;
  isSupportXS: boolean;
  nodeModulesPath: string;
  fileType: IFileType;
  globalObject: string;
  platform: string;
  // prerender?: PrerenderConfig
  prerender?: never;
  template: RecursiveTemplate | UnRecursiveTemplate;
  runtimePath?: string | string[];
  taroComponentsPath: string;
  blended?: boolean;
  hot?: boolean;
}

export type AddPageChunks = (pages: Map<string, string[]>, pagesNames?: string[]) => void;

export interface IMiniFilesConfig {
  [configName: string]: {
    content: MiniappConfig;
    path: string;
  };
}
