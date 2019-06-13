import { IBaseModule } from './base';

export interface ICLIConf {
  /**
   * 标签名
   */
  label: string;

  /**
   * 字段名
   */
  name: string;

  /**
   * 描述
   */
  description: string;

  /**
   * 链接
   */
  link: string;

  /**
   * 展示组件名称
   */
  componentName: string;

  /**
   * 展示组件的 props
   */
  componentProps: object;
}

export interface IConfParam {
  /**
   * 配置类型
   */
  type: string,

  /**
   * 参数对象
   */
  options: object
}

export interface IConfigurationModule extends IBaseModule {
  /**
   * 获取构建配置项
   */
  getCLIConf(): Promise<ICLIConf[]>;

  /**
   * 设置构建配置项
   */
  setCLIConf(param: IConfParam): any;
}
