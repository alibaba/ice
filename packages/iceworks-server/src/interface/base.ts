import * as EventEmitter from 'events';

export interface IPanel {
  isAvailable: boolean;
  name: string; 
  title: string; 
  description?: string; 
  cover?: string;
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
export interface IBaseModule extends EventEmitter {
  project: IProject;
  title: string;
  description?: string;
  cover?: string;
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
  publishTime:  string;
  repository:  string;
  screenshot:  string;
  screenshots:  string[];
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
  publishTime:  string;
  repository:  string;
  screenshot:  string;
  screenshots:  string[];
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
  categories: string[],
  repository: string;
  source: IMaterialNpmSource,
  dependencies: INpmDependencies,
  screenshot: string;
  screenshots: string[],
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
