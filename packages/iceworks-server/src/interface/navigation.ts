import { IProjectNavigation, IBaseModule } from './base';

export interface INavigationModule extends IBaseModule {
  /**
   * 获取单个导航的信息
   *
   * @param name 获取某个导航
   */
  getOne(name: string): Promise<IProjectNavigation>;

  /**
   * 获取项目内的布局
   */
  getAll(): Promise<IProjectNavigation[]>;
}
