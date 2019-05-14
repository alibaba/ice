import * as EventEmitter from 'events';

export interface IProjectConfigurationSettings {
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

export interface IProjectConfiguration extends EventEmitter {
  /**
   * 获取构建配置项
   */
  getConfigurationSettings(): Promise<IProjectConfigurationSettings[]>;
}
