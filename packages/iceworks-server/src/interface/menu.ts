import * as EventEmitter from 'events';

/**
 * 项目的菜单
 */
export interface IProjectMenuSchema {
  /**
   * 位置
   */
  position: 'header' | 'aside';

  /**
   * 名称
   */
  name: string;

  /**
   * URL 路径
   */
  path: string;

  /**
   * 图标标识
   */
  icon?: string;

  /**
   * 是否新窗口打开
   */
  newWindow?: boolean;
}

export interface IProjectMenu extends EventEmitter {
  /**
   * 获取项目菜单
   */
  getMenus(): Promise<IProjectMenuSchema[]>;

  /**
   * 添加多个菜单到项目
   *
   * @param menus 多个菜单配置
   */
  createMenus(menus: IProjectMenuSchema[]): Promise<IProjectMenuSchema[]>;

  /**
   * 添加菜单
   *
   * @param menu 菜单配置
   */
  createMenu(menu: IProjectMenuSchema): Promise<IProjectMenuSchema>;

  /**
   * 删除菜单
   *
   * @param menu 菜单配置
   */
  deleteMenu(menu: IProjectMenuSchema): Promise<void>;

  /**
   * 更新菜单
   *
   * @param menu 菜单配置
   */
  updateMenu(menu: IProjectMenuSchema): Promise<IProjectMenuSchema>;
}
