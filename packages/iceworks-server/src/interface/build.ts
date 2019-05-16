import { IBaseModule } from './base';

export interface IBuildModule extends IBaseModule {
  /**
   * 执行构建
   *
   * @param settingsEnv 环境变量
   */
  build(settingsEnv: object): Promise<IBuildModule>;
}
