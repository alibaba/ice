import { IBaseModule } from './base';

/**
 * 调试服务设置项
 */
export interface ITaskSetting {
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

export interface ITaskModule extends IBaseModule {
  /**
   * 启动调试服务
   *
   * @param args 参数对象
   */
  start(args: any): Promise<ITaskModule>;

  /**
   * 停止调试服务
   *
   * @param args 参数对象
   */
  stop(args): Promise<ITaskModule>;

  /**
   * 获取启动调试服务设置项
   *
   * @param args 参数对象
   */
  getSetting(args): Promise<ITaskSetting[]>;
}
