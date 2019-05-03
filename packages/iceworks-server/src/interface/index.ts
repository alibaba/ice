export * from './project';
export * from './material';

export interface IProjectsResult {
  projects: any[];
}
export interface IProjectResult {
  project: any;
}

export interface IProjectService {
  getProjects(): Promise<IProjectsResult>;
  getCurrent(): Promise<IProjectResult>;
  setCurrent(folderPath: string): Promise<IProjectResult>;
}

export interface IPluginGetAllResult {
  data: any[];
}

export interface IPluginService {
  getAll(projectFolderPath: string): Promise<IPluginGetAllResult>;
}
