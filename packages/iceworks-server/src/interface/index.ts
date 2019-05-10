export * from './project';
export * from './material';
export * from './build';
export * from './dev';
export * from './dependency';
export * from './mock';
export * from './router';
export * from './todo';
export * from './menu';

export interface IPluginGetAllResult {
  data: any[];
}

export interface IPluginService {
  getAll(projectPath: string): Promise<IPluginGetAllResult>;
}
