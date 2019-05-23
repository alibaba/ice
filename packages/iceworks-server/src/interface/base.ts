/**
 * 项目信息
 */
export interface IProject {
  readonly name: string;
  readonly path: string;
}

/**
 * 功能模块的基类
 */
export interface IBaseModule {
  readonly projectName: string;
  readonly projectPath: string;
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
 * TODO 项目的布局
 */
export interface IProjectLayout {}

/**
 * 物料的模板信息
 */
export interface IMaterialScaffold {
  builder: string;
  categories: string[];
  customConfig: IMaterialCustomCfg;
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
  customConfig: IMaterialCustomCfg;
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
  customConfig: IMaterialCustomCfg;
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

export interface IMaterialCustomCfg {
  [config: string]: any;
}