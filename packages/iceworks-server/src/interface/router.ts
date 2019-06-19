import { IBaseModule } from './base';


export interface IRouterOptions {
  type?: string;
  replacement?: boolean;
  parent?: string;
}

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
   * layout name
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
  bulkCreate(data: IRouter[], options?: IRouterOptions): Promise<void>
}
