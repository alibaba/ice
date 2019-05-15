import * as EventEmitter from 'events';

/**
 * 项目的 mock
 */
export interface IProjectMockSchema {
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
  getMocks(): Promise<IProjectMockSchema[]>;

  /**
   * 添加多个数据模拟到项目
   *
   * @param mocks 数据模拟配置
   */
  createMocks(mocks: IProjectMockSchema[]): Promise<IProjectMockSchema[]>;

  /**
   * 添加数据模拟
   *
   * @param mock 数据模拟配置
   */
  createMock(mock: IProjectMockSchema): Promise<IProjectMockSchema>;

  /**
   * 删除数据模拟
   *
   * @param mock 数据模拟配置
   */
  deleteMock(mock: IProjectMockSchema): Promise<void>;

  /**
   * 更新数据模拟
   *
   * @param mock 数据模拟配置
   */
  updateMock(mock: IProjectMockSchema): Promise<IProjectMockSchema>;
}
