/**
 * TODO 项目中的路由
 */
export interface IProjectRouter {

}

/**
 * 项目中的菜单
 */
export interface IProjectMenu {
  /**
   * 位置
   */
  position: 'head'|'side';

  /**
   * 名称
   */
  name: string;

  /**
   * 路径
   */
  path: string;

  /**
   * 图标标识
   */
  icon: string;

  /**
   * 是否新窗口打开
   */
  newWindow: boolean;
}


/**
 * TODO 依赖信息
 */
export interface IDependency {

}

/**
 * TODO 区块
 */
export interface IBlock {

}

/**
 * TODO 布局
 */
export interface ILayout {

}

/**
 * 页面
 */
export interface IPage {
  /**
   * 名称
   */
  name: string,

  /**
   * 文件路径
   */
  folderPath: string,

  /**
   * 此文件的创建时间的时间戳
   */
  birthtime: string,

  /**
   * 上次访问此文件的时间戳
   */
  atime?: string,

  /**
   * 上次更改文件状态的时间戳
   */
  ctime?: string,

  /**
   * 上次修改此文件的时间戳
   */
  mtime?: string,

  /**
   * 页面内的区块
   */
  blocks?: IBlock[];
}

/**
 * 添加页面的参数
 */
export interface IAddPageParam {
  /**
   * 名称
   */
  name: string;

  /**
   * 使用的布局
   */
  layout: ILayout;

  /**
   * 页面内的区块
   */
  blocks?: IBlock[];

  /**
   * 路由路径
   */
  routePath: string;

  /**
   * 菜单名
   */
  menuName?: string;
}

/**
 * 项目
 */
export interface IProject {
  /**
   * 项目名称
   */
  name: string;

  /**
   * 项目文件夹路径
   */
  folderPath: string;

  /**
   * 项目内的布局
   */
  layouts: ILayout[];

  /**
   * 项目内的页面
   */
  pages: IPage[];

  /**
   * 获取项目内的页面
   */
  getPages(): Promise<IPage[]>;

  /**
   * 添加页面
   * 
   * @param page 页面配置
   */
  addPage(page: IAddPageParam): Promise<IPage>;

  /**
   * 删除项目内的页面
   * 
   * @param pageName 页面名
   */
  removePage(pageName: string): Promise<void>;


  /**
   * 更新页面
   * 
   * @param page 页面信息
   */
  updatePage(page: IPage): Promise<IPage>;

  /**
   * 添加区块列表
   * 
   * @param pageName 页面名称
   * @param blocks 区块列表
   */
  addBlocks(pageName: string, blocks: IBlock[]): Promise<IPage>;

  /**
   * 添加区块
   * 
   * @param pageName 页面名称
   * @param block 区块信息
   */
  addBlock(pageName: string, block: IBlock): Promise<IPage>;

  /**
   * 添加菜单
   * 
   * @param menu 菜单配置
   */
  addMenu(menu: IProjectMenu): Promise<IProjectMenu>;

  /**
   * 添加路由
   * 
   * @param router 路由配置
   */
  addRouter(router: IProjectRouter): Promise<IProjectRouter>;
}

export interface IProjectsResult {
  projects: IProject[]
}
export interface IProjectResult {
  project: IProject
}

export interface IProjectService {
  getProjects(): Promise<IProjectsResult>;
  getCurrent(): Promise<IProjectResult>;
}
