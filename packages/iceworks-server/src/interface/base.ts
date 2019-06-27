export interface ISocket {
  emit(eventName: string, data?: any): void;
}

export interface IContext {
  socket: ISocket;
  i18n: II18n;
}

export interface IPanel {
  isAvailable: boolean;
  name: string;
  title: string;
  description?: string;
  cover?: string;
  module?: any;
}

/**
 * 本地化插件
 */
export interface II18n {
  format(localeKey: string, args?: object): string;
}

/**
 * 项目信息
 */
export interface IProject {
  /**
   * 项目类型：react/vue/angular...
   */
  readonly type: string;

  /**
   * 项目显示名称
   */
  readonly name: string;

  /**
   * 项目的路径
   */
  readonly path: string;

  /**
   * 项目的 package 路径
   */
  readonly packagePath: string;

  /**
   * 项目的支持的面板
   */
  readonly panels: IPanel[];

  /**
   * 项目的适配器
   */
  adapter: {[name: string]: IBaseModule};

  /**
   * 获取项目的 package.json 信息
   */
  getPackageJSON(): any;

  /**
   * 设置项目的 package.json 信息
   */
  setPackageJSON(content): any;

  /**
   * 获取项目的环境变量信息
   */
  getEnv(): any;
}

/**
 * 功能模块的基类
 */
export interface IBaseModule {
  project: IProject;
  storage: any;
}

/**
 * 项目的模板
 */
export interface IProjectScaffold {
  /**
   * 名称
   */
  name: string;

  /**
   * 标题
   */
  title: string;

  /**
   * 背景图
   */
  image?: string;
}

/**
 * 项目的布局
 */
export interface IProjectLayout {
  /**
   * 名称
   */
  name: string;

  /**
   * 标题
   */
  title: string;

  /**
   * 描述
   */
  description: string;

  /**
   * 截图 URL
   */
  screenshot: string;

  /**
   * 封面图 URL
   */
  thumbnail: string;
}

/**
 * 物料的模板信息
 */
export interface IMaterialScaffold {
  builder: string;
  categories: string[];
  customConfig: IMaterialCustomConfig;
  dependencies: INpmDependencies;
  description: string;
  homepage: string;
  name: string;
  publishTime: string;
  repository: string;
  screenshot: string;
  screenshots: string[];
  source: IMaterialNpmSource;
  title: string;
  updateTime: string;
}

/**
 * 物料的组件信息
 */
export interface IMaterialComponent {
  categories: string[];
  customConfig: IMaterialCustomConfig;
  dependencies: INpmDependencies;
  description: string;
  homepage: string;
  name: string;
  publishTime: string;
  repository: string;
  screenshot: string;
  screenshots: string[];
  source: IMaterialNpmSource;
  title: string;
  updateTime: string;

}

/**
 * 物料的区块信息
 */
export interface IMaterialBlock {
  name: string;
  customConfig: IMaterialCustomConfig;
  title: string;
  description: string;
  homepage: string;
  categories: string[];
  repository: string;
  source: IMaterialNpmSource;
  dependencies: INpmDependencies;
  screenshot: string;
  screenshots: string[];
  publishTime: string;
  updateTime: string[];
  uid: string[];
  alias: string[];
}

export interface IMaterialNpmSource {
  type: string;
  npm: string;
  version: string;
  registry: string;
  sourceCodeDirectory: string;
}

export interface INpmDependencies {
  [pacakge: string]: string;
}

export interface IMaterialCustomConfig {
  [config: string]: any;
}

export interface IConfSchema {
  /**
   * 标签名
   */
  label: string;

  /**
   * 字段名
   */
  name: string;

  /**
   * 描述
   */
  description: string;

  /**
   * 链接
   */
  link: string;

  /**
   * 展示组件名称
   */
  componentName: string;

  /**
   * 展示组件的 props
   */
  componentProps: object;
}
