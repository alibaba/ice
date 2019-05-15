import * as EventEmitter from 'events';

/**
 * 调试服务设置项
 */
export interface IProjectDevSettingsSchema {
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

export interface IProjectDev extends EventEmitter {
  /**
   * 启动调试服务
   *
   * @param settingsEnv 环境变量
   */
  devStart(settingsEnv: object): Promise<IProjectDev>;

  /**
   * 停止调试服务
   */
  devStop(): Promise<IProjectDev>;

  /**
   * 启动调试服务设置项
   */
  getDevSettings(): Promise<IProjectDevSettingsSchema[]>;
}
