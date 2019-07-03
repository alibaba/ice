import { IBaseModule, IConfSchema, IContext } from './base';

export interface IConfParam {
  /**
   * 配置类型
   */
  type: string;

  /**
   * 参数对象
   */
  options: object;
}

export interface IConfigurationModule extends IBaseModule {
  /**
   * 获取构建配置项
   */
  getCLIConf(args, ctx: IContext): Promise<IConfSchema[]>;

  /**
   * 设置构建配置项
   */
  setCLIConf(param: IConfParam): any;
}
