import * as EventEmitter from 'events';

/**
 * 项目的 Todo
 */
export interface IProjectTodoSchema {
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

export interface IProjectTodo extends EventEmitter {
  /**
   * 获取项目内的 todo
   */
  getTodos(): Promise<IProjectTodoSchema[]>;
}
