import { ILayoutModule } from './layout';
import { IPageModule } from './page';
import { IMenuModule } from './menu';
import { IComponentModule } from './component';
import { IRouterModule } from './router';
import { IDependencyModule } from './dependency';
import { ITodoModule } from './todo';
import { IMockModule } from './mock';
import { IDevModule } from './dev';
import { IBuildModule } from './build';
import { IConfigurationModule } from './configuration';

export interface IAdapter {
  layout: ILayoutModule;
  page: IPageModule;
  menu: IMenuModule;
  router: IRouterModule;
  component: IComponentModule;
  dependency: IDependencyModule;
  todo: ITodoModule;
  mock: IMockModule;
  dev: IDevModule;
  build: IBuildModule;
  configuration: IConfigurationModule;
}

export * from './base';
export * from './layout';
export * from './page';
export * from './menu';
export * from './layout';
export * from './page';
export * from './menu';
export * from './component';
export * from './router';
export * from './dependency';
export * from './todo';
export * from './mock';
export * from './dev';
export * from './build';
export * from './configuration';
