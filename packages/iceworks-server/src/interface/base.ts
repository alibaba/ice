import * as EventEmitter from 'events';

/**
 * 项目信息
 */
export interface IProject {
  /**
   * 项目显示名称
   */
  readonly name: string;

  /**
   * 项目的路径
   */
  readonly path: string;

  /**
   * 项目的支持的面板
   */
  readonly panels: string[];

  /**
   * 获取项目的 package.json 信息
   */
  getPackageJSON(): any;


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
   * 是否自定义
   */
  isCustom: boolean;

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
 * TODO 物料的模板信息
 */
export interface IMaterialScaffold {
  source: IMaterialSource;
}

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