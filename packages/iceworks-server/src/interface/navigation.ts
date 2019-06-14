import { IProjectNavigation, IBaseModule } from './base';

export interface INavigationModule extends IBaseModule {
  /**
   * 获取项目内的导航
   */
  getAll(): Promise<{ asideMenuConfig: IProjectNavigation[] }>;
}
