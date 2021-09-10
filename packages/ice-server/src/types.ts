import { IMidwayContainer, IMidwayApplication } from '@midwayjs/core';
import { IComponentInfo } from '@midwayjs/decorator';

export interface AppConfig {
  modules?: (string | IComponentInfo | {
    Configuration: any;
  })[];

  app?: {
    // life cycle
    onConfigLoad?(container: IMidwayContainer, app?: IMidwayApplication): Promise<void>;
    onReady?(container: IMidwayContainer, app?: IMidwayApplication): Promise<void>;
    onStop?(container: IMidwayContainer, app?: IMidwayApplication): Promise<void>;
  };

  bucLogin?: boolean;
}
