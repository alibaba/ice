import { provide, plugin } from 'midway';
import { IPluginService, IPluginGetAllResult } from '../../interface';

@provide('dependencyService')
export class DependencyService implements IPluginService {
  @plugin('projectManager')
  private projectManager;

  async getAll(projectFolderPath: string): Promise<IPluginGetAllResult> {
    const project = this.projectManager.getProject(projectFolderPath);
    return project ? project.getDependencies() : [];
  }

  async getOne() {

  }

  async create() {

  }

  async delete() {

  }
}
