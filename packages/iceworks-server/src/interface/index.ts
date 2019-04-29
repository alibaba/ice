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
}
