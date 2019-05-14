import { provide, plugin } from 'midway';
import { IPluginService, IPluginGetAllResult } from '../../interface';

@provide('pageService')
export class PageService implements IPluginService {
  @plugin('projectManager')
  private projectManager;

  async getAll(projectPath: string): Promise<IPluginGetAllResult> {
    const project = this.projectManager.getCurrent();

    return project ? await project.page.getPages() : [];
  }

  async getOne() {}

  async create() {}

  async delete() {}
}
