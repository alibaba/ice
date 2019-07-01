import { IProjectLayout, IMaterialBlock, IBaseModule, IContext } from './base';
/**
 * 项目的页面
 */
export interface IPage {
  /**
   * 名称
   */
  name: string;

  /**
   * 文件路径
   */
  path: string;

  /**
   * 此文件的创建时间的时间
   */
  birthtime: Date;

  /**
   * 上次访问此文件的时间
   */
  atime?: Date;

  /**
   * 上次更改文件状态的时间
   */
  ctime?: Date;

  /**
   * 上次修改此文件的时间
   */
  mtime?: Date;

  /**
   * 页面内的区块
   */
  blocks?: IProjectBlock[];
}

/**
 * 项目的区块
 */
export interface IProjectBlock {
  /**
   * 名称
   */
  name: string;

  /**
   * 本地文件夹路径
   */
  path?: string;

  /**
   * 背景图
   */
  image?: string;
}

/**
 * 创建页面的参数
 */
export interface ICreatePageParam {
  /**
   * 名称
   */
  name: string;

  /**
   * 页面内的区块
   */
  blocks?: IMaterialBlock[];

  /**
   * 路由路径
   */
  routePath: string;

  /**
   * 菜单名
   */
  menuName?: string;
}

export interface IPageModule extends IBaseModule {
  /**
   * 获取单个页面的信息
   *
   * @param name 页面名
   */
  getOne(name): Promise<IPage>;

  /**
   * 获取项目内的页面信息
   */
  getAll(): Promise<IPage[]>;

  /**
   * 添加单个页面到项目
   *
   * - 根据布局和区块生成页面文件
   * - 添加菜单
   * - 添加路由
   *
   * @param page 页面配置
   */
  create(page: ICreatePageParam, ctx: IContext): Promise<IPage>;

  /**
   * 添加多个页面到项目
   *
   * @param pages 页面配置信息
   */
  bulkCreate(pages: ICreatePageParam[]): Promise<IPage[]>;

  /**
   * 删除项目内的页面
   *
   * @param name 页面名
   */
  delete(params: {name: string}): Promise<void>;

  /**
   * 更新页面
   *
   * @param page 页面信息
   */
  update(page: IPage): Promise<IPage>;

  /**
   * 获取区块列表
   *
   * @param name 页面名称，如果无则获取项目的区块
   */
  getBlocks(name?: string): Promise<IProjectBlock[]>;

  /**
   * 添加区块
   *
   * @param block 区块信息
   * @param name 页面名称，如果无则添加区块的项目
   */
  addBlock(params: {block: IMaterialBlock, name?: string; }, ctx: IContext): Promise<void>;

  /**
   * 添加区块列表
   *
   * @param blocks 区块列表
   * @param name 页面名称，如果无则添加区块列表到项目
   */
  addBlocks(params: {blocks: IMaterialBlock[]; name?: string; }, ctx: IContext): Promise<void>;
}
