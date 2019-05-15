import * as EventEmitter from 'events';

/**
 * 项目的 Todo
 */
export interface ITodo {
  /**
   * 文件路径
   */
  filePath: string;

  /**
   * 文件内的 todo
   */
  messages: Array<{
    /**
     * 在第几行
     */
    line: string;

    /**
     * 文本
     */
    text: string;
  }>;
}

export interface ITodoModule extends EventEmitter {
  /**
   * 获取项目内的 todo
   */
  getAll(): Promise<ITodo[]>;
}
