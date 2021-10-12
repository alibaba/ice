import { IMidwayContainer, IMidwayApplication } from '@midwayjs/core';
import { IComponentInfo } from '@midwayjs/decorator';

export type AppModule = (string | IComponentInfo | { Configuration: any })

export type LifeCycleFunc = (container: IMidwayContainer, app?: IMidwayApplication) => void;

type AddMiddlewares = ({ app, baseDir, appDir, ctx, useConfig }) => Promise<any[]>;

export interface AppConfig {
  // midway 组件
  modules?: AppModule[];

  // 中间件
  addMiddlewares?: AddMiddlewares;

  app?: {
    // 生命周期
    onConfigLoad?: LifeCycleFunc;
    onReady?: LifeCycleFunc;
    onStop?: LifeCycleFunc;
  };
}

export interface MidwayConfiguration {
  importConfigs: any[];
  modules: AppModule[];
  addMiddlewares?: AddMiddlewares;
  onConfigLoad?: LifeCycleFunc;
  onReady?: LifeCycleFunc;
  onStop?: LifeCycleFunc;
}
