import * as EventEmitter from 'events';

/**
 * 项目信息
 */
export interface IProject {
  readonly name: string;
  readonly path: string;
  readonly panels: string[];
  getPackageJSON(): any;
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