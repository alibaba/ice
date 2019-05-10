import * as EventEmitter from 'events';

/**
 * 项目的依赖信息
 */
export interface IProjectDependency extends EventEmitter {
  /**
   * 包名
   */
  package: string;

  /**
   * 指定版本：^1.0.1 / ~1.0.1 / 0.0.x
   */
  specifyVersion: string;

  /**
   * 当前本地版本：1.0.3
   */
  localVersion?: string;

  /**
   * 是否可更新：当远程有 1.0.4 时，该值为 true
   */
  canUpdate?: boolean;

  /**
   * 是否本地依赖 devDependencies ？
   */
  dev: boolean;
}

export interface IProjectDependency extends EventEmitter {
  /**
   * 获取项目内的依赖
   */
  getDependencies(): Promise<IProjectDependency[]>;

  /**
   * 添加多个依赖到项目
   *
   * @param dependencies 依赖列表
   */
  createDependencies(
    dependencies: IProjectDependency[]
  ): Promise<IProjectDependency[]>;

  /**
   * 添加依赖到项目
   *
   * @param dependency 依赖信息
   */
  createDependency(dependency: IProjectDependency): Promise<IProjectDependency>;

  /**
   * 升级项目中的某个依赖
   *
   * @param denpendency 指定依赖
   */
  upgradeDependency(denpendency: {
    name: string;
    isDev: boolean;
  }): Promise<IProjectDependency>;
}
