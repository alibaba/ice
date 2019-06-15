import { IBaseModule } from './base';

/**
 * project router
 */
export interface IRouter {
  /**
   * URL path
   */
  path: string;

  /**
   * component name
   */
  component?: string;

  /**
   * layout 名
   */
  layout?: string;

  /**
   * children routes
   */
  routes?: IRouter[];
}

export interface IRouterModule extends IBaseModule {
  /**
   * get routers
   */
  getAll(): Promise<IRouter[]>;

  /**
   * set routers
   */
  setData(data: IRouter[]): Promise<void>

  /**
   * create a router
   */
  create(data): Promise<void>
}
