import { IMaterialComponent, IBaseModule } from './base';

/**
 * 项目的组件
 */
export interface IComponent {
  /**
   * 名称
   */
  name: string;

  /**
   * 是否可更新
   */
  canUpdate?: boolean;
}

export interface IComponentModule extends IBaseModule {
  /**
   * 获取项目内的组件
   */
  getAll(): Promise<IComponent[]>;

  /**
   * 添加组件到项目
   *
   * @param component 组件信息
   */
  create(component: IMaterialComponent): Promise<IComponent>;

  /**
   * 添加多个组件到项目
   *
   * @param components 组件信息
   */
  bulkCreate(components: IMaterialComponent[]): Promise<IComponent[]>;

  /**
   * 升级某个组件
   *
   * @param name 组件名
   */
  upgrade(name: string): Promise<IComponent>;
}
