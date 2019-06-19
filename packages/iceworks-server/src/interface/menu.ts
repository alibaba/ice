import { IBaseModule } from './base';

export interface IMenuOptions {
  type?: string;
  replacement?: boolean;
}

/**
 * 项目的菜单
 */
export interface IMenu {
  /**
   * position
   */
  position?: 'header' | 'aside';

  /**
   * id
   */
  id: string;

  /**
   * name
   */
  name: string;

  /**
   * URL
   */
  path: string;

  /**
   * icon
   */
  icon?: string;

  /**
   * open new window
   */
  newWindow?: boolean;

  /**
   * menu children
   */
  children?: IMenu[];
}

export interface IMenuModule extends IBaseModule {
  /**
   * get menu config
   */
  getAll(): Promise<{ asideMenuConfig: IMenu[] }>;

  /**
   * bulk create menus
   */
  bulkCreate(params: {data: IMenu[], options: IMenuOptions}): Promise<void>
}
