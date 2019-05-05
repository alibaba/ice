export * from './project';
export * from './material';

export interface IPluginGetAllResult {
  data: any[];
}

export interface IPluginService {
  getAll(projectFolderPath: string): Promise<IPluginGetAllResult>;
}
