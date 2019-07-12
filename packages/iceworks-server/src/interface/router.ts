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
  children?: IRouter[];
}

export interface IRouterModule extends IBaseModule {
  /**
   * get routers
   */
  getAll(): Promise<IRouter[]>;

  /**
   * set routers
   */
  bulkCreate(params: {data: IRouter[], options?: IRouterOptions}): Promise<void>;

  /**
   * delete router by component name
   */
  delete(params: {componentName: string}): Promise<string[]>;
}
