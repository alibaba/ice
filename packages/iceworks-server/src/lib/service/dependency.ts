import { provide, plugin } from 'midway';
import { IPluginService, IPluginGetAllResult } from '../../interface';

@provide('dependencyService')
export class DependencyService implements IPluginService {
  @plugin('projectClient')
  private projectClient;

  async getAll(projectFolderPath: string): Promise<IPluginGetAllResult> {
    const project = this.projectClient.getProject(projectFolderPath);
    return {
      data: project ? await project.getDependencies() : []
    };
  }

  async getOne() {

  }

  async create() {

  }

  async delete() {

  }
}
