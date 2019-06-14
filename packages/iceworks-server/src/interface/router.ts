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
   * 组件名
   */
  component?: string;

  /**
   * layout 名
   */
  layout?: string;

  routes?: IRouter[];
}

export interface IRouterModule extends IBaseModule {
  /**
   * 获取项目路由
   */
  getAll(): Promise<IRouter[]>;
}
