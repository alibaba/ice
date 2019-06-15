import { IProjectNavigation, IBaseModule } from './base';

export interface INavigationModule extends IBaseModule {
  /**
   * get navigation menu config
   */
  getAll(): Promise<{ asideMenuConfig: IProjectNavigation[] }>;

  /**
   * create navigation
   */
  create(type, data: IProjectNavigation): Promise<void>;
}
