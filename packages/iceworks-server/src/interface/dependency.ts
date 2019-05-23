import { IBaseModule } from './base';

/**
 * 项目的依赖信息
 */
export interface IDependency {
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
   * 可更新版本：当远程有 1.0.4 时，该值为 1.0.4
   */
  wantedVestion?: string;

  /**
   * 最新版本
   */
  latestVestion?: string;

  /**
   * 是否本地依赖 devDependencies ？
   */
  dev: boolean;
}

export interface ICreateDependencyParam {
  pacakge: string;

  version: string;
}

export interface IDependencyModule extends IBaseModule {
  /**
   * 获取项目内的依赖
   */
  getAll(): Promise<{ denpendencies: IDependency[], devDenpendencies: IDependency[] }>;

  /**
   * 添加依赖到项目
   *
   * @param dependency 依赖信息
   */
  create(dependency: ICreateDependencyParam): Promise<IDependency>;

  /**
   * 添加多个依赖到项目
   *
   * @param dependencies 依赖列表
   */
  creates(dependencies: ICreateDependencyParam[]): Promise<IDependency[]>;

  /**
   * 升级项目中的某个依赖
   *
   * @param denpendency 指定依赖
   */
  upgrade(denpendency: { name: string; isDev: boolean }): Promise<IDependency>;
}
