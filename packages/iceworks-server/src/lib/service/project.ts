import { provide } from 'midway';
import * as EventEmitter from 'events';
import { IProjectService, IProjectsResult, IProjectResult } from '../../interface';
import storage from '../storage';
import Project from '../adapter/project';
import getEnv from '../getEnv';

@provide('projectService')
export class ProjectService implements IProjectService {
  async getProjects(): Promise<IProjectsResult> {
    const projectFolderPaths = storage.get('projects');
    return {
      projects: await Promise.all(projectFolderPaths.map(async (projectFolderPath) => {
        const project = new Project(projectFolderPath);
        return project;
      }))
    };
  }

  async getCurrent(): Promise<IProjectResult> {
    const projectFolderPath = storage.get('currentProject');
    const project = new Project(projectFolderPath);
    return {
      project
    };
  }

  async setCurrent(folderPath: string): Promise<IProjectResult> {
    storage.set('currentProject', folderPath);
    const project = new Project(folderPath);
    return {
      project
    };
  }

  async dev(folderPath: string): Promise<EventEmitter> {
    const project = new Project(folderPath);
    return await project.startDev(getEnv());
  }

  async build() {}

  async lint() {}
}
