import { IMidwayContainer, IMidwayApplication } from '@midwayjs/core';
import { IComponentInfo } from '@midwayjs/decorator';

export type AppModule = (string | IComponentInfo | { Configuration: any })

export interface AppConfig {
  modules?: AppModule[];

  app?: {
    // life cycle
    onConfigLoad?(container: IMidwayContainer, app?: IMidwayApplication): Promise<void>;
    onReady?(container: IMidwayContainer, app?: IMidwayApplication): Promise<void>;
    onStop?(container: IMidwayContainer, app?: IMidwayApplication): Promise<void>;
  };

  bucLogin?: boolean;
}

type LifeCycleFunc = (app: any) => void;
export interface MidwayConfiguration {
  importConfigs: any[];
  imports: AppModule[];
  onConfigLoadQueue?: LifeCycleFunc[];
  onReadyLoadQueue?: LifeCycleFunc[];
  onStopLoadQueue?: LifeCycleFunc[];
}
