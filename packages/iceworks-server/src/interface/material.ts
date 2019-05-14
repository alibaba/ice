import * as EventEmitter from 'events';
/**
 * 项目的页面
 */
export interface IProjectPage {
  /**
   * 名称
   */
  name: string;

  /**
   * 文件路径
   */
  projectPath: string;

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
  projectPath?: string;

  /**
   * 背景图
   */
  image?: string;
}

/**
 * 项目的组件
 */
export interface IProjectComponent {
  /**
   * 名称
   */
  name: string;

  /**
   * 是否可更新
   */
  canUpdate?: boolean;
}

/**
 * 项目的模板
 */
export interface IProjectScaffold {
  /**
   * 名称
   */
  name: string;

  /**
   * 标题
   */
  title: string;

  /**
   * 背景图
   */
  image?: string;
}

/**
 * TODO 项目的布局
 */
export interface IProjectLayout {}

/**
 * 创建页面的参数
 */
export interface ICreatePageParam {
  /**
   * 名称
   */
  name: string;

  /**
   * 使用的布局
   */
  layout: IProjectLayout;

  /**
   * 页面内的区块
   */
  blocks?: IProjectBlock[];

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
 * TODO 物料的模板信息
 */
export interface IMaterialScaffold {}

/**
 * TODO 物料的区块信息
 */
export interface IMaterialBlock {}
/**
 * TODO 物料的组件信息
 */
export interface IMaterialComponent {}

export interface IProjectPage extends EventEmitter {
  /**
   * 获取项目内的页面信息
   */
  getPages(): Promise<IProjectPage[]>;

  /**
   * 获取单个页面的信息
   *
   * @param pageName 页面名
   */
  getPage(pageName): Promise<IProjectPage>;

  /**
   * 添加多个页面到项目
   *
   * @param pages 页面配置信息
   */
  createPages(pages: ICreatePageParam[]): Promise<IProjectPage[]>;

  /**
   * 添加单个页面到项目
   *
   * - 根据布局和区块生成页面文件
   * - 添加菜单
   * - 添加路由
   *
   * @param page 页面配置
   */
  createPage(page: ICreatePageParam): Promise<IProjectPage>;

  /**
   * 删除项目内的页面
   *
   * @param pageName 页面名
   */
  deletePage(pageName: string): Promise<void>;

  /**
   * 更新页面
   *
   * @param page 页面信息
   */
  updatePage(page: IProjectPage): Promise<IProjectPage>;

  /**
   * 获取区块列表
   *
   * @param pageName 页面名称，如果无则获取项目的区块
   */
  getBlocks(pageName?: string): Promise<IProjectBlock[]>;

  /**
   * 添加区块列表
   *
   * @param blocks 区块列表
   * @param pageName 页面名称，如果无则添加区块列表到项目
   */
  createBlocks(
    blocks: IMaterialBlock[],
    pageName?: string
  ): Promise<IProjectBlock[]>;

  /**
   * 添加区块
   *
   * @param block 区块信息
   * @param pageName 页面名称，如果无则添加区块的项目
   */
  createBlock(block: IMaterialBlock, pageName?: string): Promise<IProjectBlock>;

  /**
   * 获取项目内的组件
   */
  getComponents(): Promise<IProjectComponent[]>;

  /**
   * 添加多个组件到项目
   *
   * @param components 组件信息
   */
  createComponents(
    components: IMaterialComponent[]
  ): Promise<IProjectComponent[]>;

  /**
   * 添加组件到项目
   *
   * @param component 组件信息
   */
  createComponent(component: IMaterialComponent): Promise<IProjectComponent>;

  /**
   * 升级某个组件
   *
   * @param name 组件名
   */
  upgradeComponent(name: string): Promise<IProjectComponent>;

  /**
   * 获取项目内的布局
   */
  getLayouts(): Promise<IProjectLayout[]>;

  /**
   * 获取单个布局的信息
   *
   * @param layoutName 布局名
   */
  getLayout(layoutName: string): Promise<IProjectLayout>;
}
