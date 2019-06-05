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

/**
 * 任务命令的参数
 */
export interface ITaskParam {
  /**
   * 命令名称
   */
  command: string
}

export interface ITaskModule extends IBaseModule {
  /**
   * 启动调试服务
   *
   * @param task 任务信息
   */
  start(taskParam: ITaskParam): Promise<ITaskModule>;

  /**
   * 停止调试服务
   *
   * @param task 任务信息
   */
  stop(task: ITaskParam): Promise<ITaskModule>;

  /**
   * 获取启动调试服务设置项
   *
   * @param task 任务信息
   */
  getSetting(task: ITaskParam): Promise<ITaskSetting[]>;
}
