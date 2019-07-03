import { IBaseModule, IContext, IConfSchema } from './base';

/**
 * 调试服务设置项
 */
export interface ITaskConf {
  /**
   * 开发配置
   */
  dev: IConfSchema[];

  /**
   * 构建配置
   */
  build: IConfSchema[];

  /**
   * 语法检查配置
   */
  lint: IConfSchema[];
}

/**
 * 任务命令的参数
 */
export interface ITaskParam {
  /**
   * 命令名称
   */
  command: string;

  /**
   * 参数对象
   */
  options: object;
}

export interface ITaskModule extends IBaseModule {
  /**
   * 启动调试服务
   *
   * @param task 任务信息
   */
  start(taskParam: ITaskParam, ctx: IContext): Promise<ITaskModule>;

  /**
   * 停止调试服务
   *
   * @param task 任务信息
   */
  stop(task: ITaskParam, ctx: IContext): Promise<ITaskModule>;

  /**
   * 查询调试服务运行状态
   *
   * @param task 任务信息
   * @return {string} 是否运行中
   */
  getStatus(task: ITaskParam): string;

  /**
   * 获取任务配置项
   *
   * @param task 任务信息
   */
  getConf(task: ITaskParam, ctx: IContext): Promise<IConfSchema[]>;

  /**
   * 设置任务配置项
   */
  setConf(task: ITaskParam): any;
}
