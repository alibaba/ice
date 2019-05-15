import * as EventEmitter from 'events';

/**
 * 项目的路由
 */
export interface IProjectRouterSchema {
  /**
   * URL 路径
   */
  path: string;

  /**
   * 页面名
   */
  pageName: string;
}

export interface IProjectRouter extends EventEmitter {
  /**
   * 获取项目路由
   */
  getRouters(): Promise<IProjectRouterSchema[]>;

  /**
   * 添加多个路由到项目
   *
   * @param routers 多个路由配置
   */
  createRouters(
    routers: IProjectRouterSchema[]
  ): Promise<IProjectRouterSchema[]>;

  /**
   * 添加路由
   *
   * @param router 路由配置
   */
  createRouter(router: IProjectRouterSchema): Promise<IProjectRouterSchema>;

  /**
   * 删除路由
   *
   * @param path 路由路径
   */
  deleteRouter(path: string): Promise<void>;

  /**
   * 更新路由
   *
   * @param router 路由配置
   */
  updateRouter(router: IProjectRouterSchema): Promise<IProjectRouterSchema>;
}
