import { IBaseModule } from './base';

export interface IDEFPushParams {
  target: string;
  commitId: string;
  branch: string;
  repository: string;
  empId: string;
}

export interface IDEFModule extends IBaseModule {
  push(params: IDEFPushParams): Promise<void>;
}
