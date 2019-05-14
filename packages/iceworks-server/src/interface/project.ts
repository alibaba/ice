import * as EventEmitter from 'events';

/**
 * 项目
 */
export interface IProject extends EventEmitter {
  /**
   * 项目名称
   */
  projectName: string;

  /**
   * 项目文件夹路径
   */
  projectPath: string;
}
