import { IBaseModule } from './base';

/**
 * 项目的菜单
 */
export interface IMenu {
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

export interface IMenuModule extends IBaseModule {
  /**
   * 获取项目菜单
   */
  getAll(): Promise<IMenu[]>;

  /**
   * 添加菜单
   *
   * @param menu 菜单配置
   */
  create(menu: IMenu): Promise<IMenu>;

  /**
   * 添加多个菜单到项目
   *
   * @param menus 多个菜单配置
   */
  creates(menus: IMenu[]): Promise<IMenu[]>;

  /**
   * 删除菜单
   *
   * @param menu 菜单配置
   */
  delete(menu: IMenu): Promise<void>;

  /**
   * 更新菜单
   *
   * @param menu 菜单配置
   */
  update(menu: IMenu): Promise<IMenu>;
}
