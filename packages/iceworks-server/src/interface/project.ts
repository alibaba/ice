import * as EventEmitter from 'events';

/**
 * 项目
 */
export interface IProject extends EventEmitter {
  /**
   * 项目名称
   */
  name: string;

  /**
   * 项目文件夹路径
   */
  folderPath: string;
}
