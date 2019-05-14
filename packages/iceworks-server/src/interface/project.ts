import { IMaterialBlock, IMaterialComponent } from './material';
import * as EventEmitter from 'events';

/**
 * 项目的路由
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

/**
 * 项目的菜单
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
 * 项目的 Todo
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
 * 项目的依赖信息
 */
export interface IProjectDependency {
  /**
   * 包名
   */
  package: string;

  /**
   * 指定版本：^1.0.1 / ~1.0.1 / 0.0.x
   */
  specifyVersion: string;

  /**
   * 当前本地版本：1.0.3
   */
  localVersion?: string;

  /**
   * 是否可更新：当远程有 1.0.4 时，该值为 true
   */
  canUpdate?: boolean;

  /**
   * 是否本地依赖 devDependencies ？
   */
  dev: boolean;
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
  folderPath?: string;

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
  blocks?: IProjectBlock[];
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
 * 调试服务设置项
 */
export interface IProjectDevSettings {
  /**
   * 标签名
   */
  label: string;

  /**
   * 字段名
   */
  name: string;

  /**
   * 展示组件名称
   */
  componentName: string;

  /**
   * 展示组件的 props
   */
  componentProps: object;
}

/**
 * 工程设置项
 * 1. ice-scripts: ice.config.js
 * 2. vue-cli: vue.config.js
 */

export interface IProjectConfigurationSettings {
  /**
   * 标签名
   */
  label: string;

  /**
   * 字段名
   */
  name: string;

  /**
   * 描述
   */
  description: string;

  /**
   * 链接
   */
  link: string;

  /**
   * 展示组件名称
   */
  componentName: string;

  /**
   * 展示组件的 props
   */
  componentProps: object;
}

/**
 * 项目
 *
 *  - 'dev.data' 事件
 *  - 'dev.error' 事件
 *  - 'dev.exit' 事件
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

  /**
   * 调试服务的状态
   */
  devStatus: 'normal'|'staring'|'working'|'stop';

  /**
   * 启动调试服务
   *
   * @param settingsEnv 环境变量
   */
  devStart(settingsEnv: object): Promise<IProject>;

  /**
   * 停止调试服务
   */
  devStop(): Promise<IProject>;

  /**
   * 启动调试服务设置项
   */
  getDevSettings(): Promise<IProjectDevSettings[]>;

  /**
   * 执行构建
   *
   * @param settingsEnv 环境变量
   */
  build(settingsEnv: object): Promise<IProject>;

  /**
   * 获取构建配置项
   */
  getConfigurationSettings(): Promise<IProjectConfigurationSettings[]>;

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
   * 获取项目内的依赖
   */
  getDependencies(): Promise<IProjectDependency[]>;

  /**
   * 添加多个依赖到项目
   *
   * @param dependencies 依赖列表
   */
  createDependencies(
    dependencies: IProjectDependency[]
  ): Promise<IProjectDependency[]>;

  /**
   * 添加依赖到项目
   *
   * @param dependency 依赖信息
   */
  createDependency(dependency: IProjectDependency): Promise<IProjectDependency>;

  /**
   * 升级项目中的某个依赖
   *
   * @param denpendency 指定依赖
   */
  upgradeDependency(denpendency: {
    name: string;
    isDev: boolean;
  }): Promise<IProjectDependency>;

  /**
   * 获取项目内的 todo
   */
  getTodos(): Promise<IProjectTodo[]>;

  /**
   * 获取项目菜单
   */
  getMenus(): Promise<IProjectMenu[]>;

  /**
   * 添加多个菜单到项目
   *
   * @param menus 多个菜单配置
   */
  createMenus(menus: IProjectMenu[]): Promise<IProjectMenu[]>;

  /**
   * 添加菜单
   *
   * @param menu 菜单配置
   */
  createMenu(menu: IProjectMenu): Promise<IProjectMenu>;

  /**
   * 删除菜单
   *
   * @param menu 菜单配置
   */
  deleteMenu(menu: IProjectMenu): Promise<void>;

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
   * 添加多个路由到项目
   *
   * @param routers 多个路由配置
   */
  createRouters(routers: IProjectRouter[]): Promise<IProjectRouter[]>;

  /**
   * 添加路由
   *
   * @param router 路由配置
   */
  createRouter(router: IProjectRouter): Promise<IProjectRouter>;

  /**
   * 删除路由
   *
   * @param path 路由路径
   */
  deleteRouter(path: string): Promise<void>;

  /**
   * 更新路由
   *
   * @param router 路由配置
   */
  updateRouter(router: IProjectRouter): Promise<IProjectRouter>;

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
