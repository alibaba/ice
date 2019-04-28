/**
 * 项目中的路由
 */
export interface IProjectRouter {
  /**
   * URL 路径
   */
  path: string;

  /**
   * 页面名
   */
  pageName: string;
}

/**
 * 项目中的 mock
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

/**
 * 项目中的菜单
 */
export interface IProjectMenu {
  /**
   * 位置
   */
  position: 'header' | 'aside';

  /**
   * 名称
   */
  name: string;

  /**
   * URL 路径
   */
  path: string;

  /**
   * 图标标识
   */
  icon?: string;

  /**
   * 是否新窗口打开
   */
  newWindow?: boolean;
}

/**
 * 项目中的 Todo
 */
export interface IProjectTodo {
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

/**
 * 依赖信息
 */
export interface IDependency {
  /**
   * 是否本地依赖 devDependencies ？
   */
  dev: boolean;

  /**
   * 名称
   */
  name: string;

  /**
   * 指定版本：^1.0.1 / ~1.0.1 / 0.0.x
   */
  specifyingVersion: string;

  /**
   * 当前本地版本：1.0.3
   */
  localVersion?: string;

  /**
   * 是否可更新：当远程有 1.0.4 时，该值为 true
   */
  canUpdate?: boolean;
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
  name: string;

  /**
   * 文件路径
   */
  folderPath: string;

  /**
   * 此文件的创建时间的时间戳
   */
  birthtime: string;

  /**
   * 上次访问此文件的时间戳
   */
  atime?: string;

  /**
   * 上次更改文件状态的时间戳
   */
  ctime?: string;

  /**
   * 上次修改此文件的时间戳
   */
  mtime?: string;

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
   * 获取项目内的布局
   */
  getLayouts(): Promise<ILayout[]>;

  /**
   * 获取单个布局的信息
   */
  getLayout(layoutName: string): Promise<ILayout>;

  /**
   * 获取项目内的页面
   */
  getPages(): Promise<IPage[]>;

  /**
   * 获取单个页面的信息
   *
   * @param pageName 页面名
   */
  getPage(pageName): Promise<IPage>;

  /**
   * 添加页面
   *
   * - 根据布局和区块生成页面文件
   * - 添加菜单
   * - 添加路由
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
   * 获取项目内的依赖
   */
  getDependencies(): Promise<IDependency[]>;

  /**
   * 升级项目中的某个依赖
   *
   * @param denpendency 指定依赖
   */
  upgradeDependency(denpendency: {name: string, isDev: boolean}): Promise<IDependency>;

  /**
   * 添加依赖
   *
   * @param dependencies 依赖列表
   */
  addDependencies(dependencies: IDependency[]): Promise<IDependency[]>;

  /**
   * 获取项目内的 todo
   */
  getTodos(): Promise<IProjectTodo[]>;

  /**
   * 获取项目菜单
   */
  getMenus(): Promise<IProjectMenu[]>;

  /**
   * 添加菜单
   *
   * @param menu 菜单配置
   */
  addMenu(menu: IProjectMenu): Promise<IProjectMenu>;

  /**
   * 删除菜单
   *
   * @param menu 菜单配置
   */
  removeMenu(menu: IProjectMenu): Promise<void>;

  /**
   * 更新菜单
   *
   * @param menu 菜单配置
   */
  updateMenu(menu: IProjectMenu): Promise<IProjectMenu>;

  /**
   * 获取项目路由
   */
  getRouters(): Promise<IProjectRouter[]>;

  /**
   * 添加路由
   *
   * @param router 路由配置
   */
  addRouter(router: IProjectRouter): Promise<IProjectRouter>;

  /**
   * 删除路由
   *
   * @param path 路由路径
   */
  removeRouter(path: string): Promise<void>;

  /**
   * 更新路由
   *
   * @param router 路由配置
   */
  updateMenu(router: IProjectRouter): Promise<IProjectRouter>;

  /**
   * 获取项目的数据模拟配置
   */
  getMocks(): Promise<IProjectMock[]>;

  /**
   * 添加数据模拟
   * 
   * @param mock 数据模拟配置
   */
  addMock(mock: IProjectMock): Promise<IProjectMock>;

  /**
   * 删除数据模拟
   * 
   * @param mock 数据模拟配置
   */
  addMock(mock: IProjectMock): Promise<void>;

  /**
   * 更新数据模拟
   * 
   * @param mock 数据模拟配置
   */
  updateMock(mock: IProjectMock): Promise<IProjectMock>;
}

export interface IProjectsResult {
  projects: IProject[];
}
export interface IProjectResult {
  project: IProject;
}

export interface IProjectService {
  getProjects(): Promise<IProjectsResult>;
  getCurrent(): Promise<IProjectResult>;
}
