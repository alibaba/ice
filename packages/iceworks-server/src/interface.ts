/**
 * @description User-Service response
 */
export interface IProject {
  folderPath: string;
}

export interface IProjectsResult {
  projects: IProject[]
}
export interface IProjectResult {
  project: IProject
}

/**
 * @description User-Service abstractions
 */
export interface IProjectService {
  getProjects(): Promise<IProjectsResult>;
  getCurrent(): Promise<IProjectResult>;
}
