import { IBaseModule } from './base';

export interface ITodoMsg {
  /**
   * 在第几行
   */
  line: number;

  /**
   * 文本
   */
  content: string;

  /**
   * 类型
   */
  type: string;
}

/**
 * 项目的 Todo
 */
export interface ITodo {
  /**
   * 文件路径
   */
  path: string;

  /**
   * 文件内的 todo
   */
  messages: ITodoMsg[];
}

export interface ITodoModule extends IBaseModule {
  /**
   * 获取项目内的 todo
   */
  getList(): Promise<ITodo[]>;
}
