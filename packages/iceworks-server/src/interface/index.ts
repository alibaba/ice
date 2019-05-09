export * from './project';
export * from './material';

export interface IPluginGetAllResult {
  data: any[];
}

export interface IPluginService {
  getAll(projectPath: string): Promise<IPluginGetAllResult>;
}
