import { IBaseModule } from './base';

/**
 * 项目的路由
 */
export interface IRouter {
  /**
   * URL 路径
   */
  path: string;

  /**
   * 页面名
   */
  pageName: string;
}

export interface IRouterModule extends IBaseModule {
  /**
   * 获取项目路由
   */
  getAll(): Promise<IRouter[]>;

  /**
   * 添加路由
   *
   * @param router 路由配置
   */
  create(router: IRouter): Promise<IRouter>;

  /**
   * 添加多个路由到项目
   *
   * @param routers 多个路由配置
   */
  bulkCreate(routers: IRouter[]): Promise<IRouter[]>;

  /**
   * 删除路由
   *
   * @param path 路由路径
   */
  delete(path: string): Promise<void>;

  /**
   * 更新路由
   *
   * @param router 路由配置
   */
  update(router: IRouter): Promise<IRouter>;
}
