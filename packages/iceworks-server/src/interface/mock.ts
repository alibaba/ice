import { IBaseModule } from './base';

/**
 * 项目的 mock
 */
export interface IMock {
  /**
   * 路径
   */
  path: string;

  /**
   * 方法
   */
  method: string;

  /**
   * 状态码
   */
  status: number;

  /**
   * 返回主体
   */
  body: string;
}

export interface IMockModule extends IBaseModule {
  /**
   * 获取项目的数据模拟配置
   */
  getAll(): Promise<IMock[]>;

  /**
   * 添加数据模拟
   *
   * @param mock 数据模拟配置
   */
  create(mock: IMock): Promise<IMock>;

  /**
   * 添加多个数据模拟到项目
   *
   * @param mocks 数据模拟配置
   */
  creates(mocks: IMock[]): Promise<IMock[]>;

  /**
   * 删除数据模拟
   *
   * @param mock 数据模拟配置
   */
  delete(mock: IMock): Promise<void>;

  /**
   * 更新数据模拟
   *
   * @param mock 数据模拟配置
   */
  update(mock: IMock): Promise<IMock>;
}
