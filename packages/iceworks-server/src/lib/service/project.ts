import { provide } from 'midway';
import { IProjectService, IProjectsResult, IProjectResult } from '../../interface';
import { projectsStorage, recordStorage } from '../storage';
import Project from '../adapter/project';

@provide('projectService')
export class ProjectService implements IProjectService {
  async getProjects(): Promise<IProjectsResult> {
    const projectFolderPaths = projectsStorage.get() || [];
    return {
      projects: await Promise.all(projectFolderPaths.map(async (projectFolderPath) => {
        const project = new Project(projectFolderPath);
        await project.load();
        return project;
      }))
    };
  }

  async getCurrent(): Promise<IProjectResult> {
    const projectFolderPath = recordStorage.get() || '';
    const project = new Project(projectFolderPath);
    await project.load();
    return {
      project
    };
  }
}
