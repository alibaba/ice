/**
 * 项目信息
 */
export interface IProject {
  readonly name: string;
  readonly path: string;
  getPackageJSON(): any;
  getEnv(): any;
}

/**
 * 功能模块的基类
 */
export interface IBaseModule {
  project: IProject;
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
export interface IProjectLayout { }

/**
 * TODO 物料的模板信息
 */
export interface IMaterialScaffold { }

/**
 * TODO 物料的组件信息
 */
export interface IMaterialComponent { }

/**
 * 物料的源信息
 */
export interface IMaterialSource {
  type: string;
  npm: string;
  version: string;
  registry: string;
  sourceCodeDirectory: string;
}

/**
 * 物料的区块信息
 */
export interface IMaterialBlock {
  name: string;
  title: string;
  description: string;
  homepage: string;
  categories: string[],
  repository: string;
  source: IMaterialSource,
  dependencies: {
    [pacakge: string]: string;
  },
  screenshot: string;
  screenshots: string[],
  publishTime: string;
  updateTime: string[];
  uid: string[];
  alias: string[];
}