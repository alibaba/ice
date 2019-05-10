import * as EventEmitter from 'events';

export interface IProjectBuild extends EventEmitter {
  /**
   * 执行构建
   *
   * @param settingsEnv 环境变量
   */
  build(settingsEnv: object): Promise<IProjectBuild>;
}
