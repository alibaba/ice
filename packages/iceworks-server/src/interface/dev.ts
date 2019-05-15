import { IBaseModule } from './base';

/**
 * 调试服务设置项
 */
export interface IDevSettings {
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

export interface IDevModule extends IBaseModule {
  /**
   * 启动调试服务
   *
   * @param settingsEnv 环境变量
   */
  start(settingsEnv: object): Promise<IDevModule>;

  /**
   * 停止调试服务
   */
  stop(): Promise<IDevModule>;

  /**
   * 获取启动调试服务设置项
   */
  getAll(): Promise<IDevSettings[]>;
}
