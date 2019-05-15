import { provide, plugin } from 'midway';

@provide('pageService')
export class PageService {
  @plugin('projectManager')
  private projectManager;

  async getAll(projectPath: string) {
    const project = this.projectManager.getCurrent();

    return project ? await project.page.getPages() : [];
  }

  async getOne() {}

  async create() {}

  async delete() {}
}
