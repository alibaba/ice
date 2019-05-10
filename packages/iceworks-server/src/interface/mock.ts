import * as EventEmitter from 'events';

/**
 * 项目的 mock
 */
export interface IProjectMock {
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

export interface IProjectMock extends EventEmitter {
  /**
   * 获取项目的数据模拟配置
   */
  getMocks(): Promise<IProjectMock[]>;

  /**
   * 添加多个数据模拟到项目
   *
   * @param mocks 数据模拟配置
   */
  createMocks(mocks: IProjectMock[]): Promise<IProjectMock[]>;

  /**
   * 添加数据模拟
   *
   * @param mock 数据模拟配置
   */
  createMock(mock: IProjectMock): Promise<IProjectMock>;

  /**
   * 删除数据模拟
   *
   * @param mock 数据模拟配置
   */
  deleteMock(mock: IProjectMock): Promise<void>;

  /**
   * 更新数据模拟
   *
   * @param mock 数据模拟配置
   */
  updateMock(mock: IProjectMock): Promise<IProjectMock>;
}
