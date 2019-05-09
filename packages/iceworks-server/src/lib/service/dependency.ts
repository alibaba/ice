import { provide, plugin } from 'midway';
import { IPluginService, IPluginGetAllResult } from '../../interface';

@provide('dependencyService')
export class DependencyService implements IPluginService {
  @plugin('projectManager')
  private projectManager;

  async getAll(projectPath: string): Promise<IPluginGetAllResult> {
    const project = this.projectManager.getProject(projectPath);
    return {
      data: project ? await project.getDependencies() : [],
    };
  }

  async getOne() {}

  async create() {}

  async delete() {}
}
